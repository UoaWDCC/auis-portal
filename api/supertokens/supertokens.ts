import supertokens from "supertokens-node";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import Session from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles, { addRoleToUser } from "supertokens-node/recipe/userroles";
import { RecipeListFunction } from "supertokens-node/lib/build/types";

export function getConfiguredRecipeList(): RecipeListFunction[] {
  return [
    EmailPassword.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signUp: async function (input) {
              let existingUsers = await supertokens.listUsersByAccountInfo(
                input.tenantId,
                {
                  email: input.email,
                }
              );
              if (existingUsers.length === 0) {
                // this means this email is new so we allow sign up
                let response = await originalImplementation.signUp(input);

                if (
                  response.status === "OK" &&
                  response.user.loginMethods.length === 1 &&
                  input.session === undefined
                ) {
                  await UserMetadata.updateUserMetadata(response.user.id, {
                    bIsUserInfoComplete: false,
                    bIsMembershipPaymentComplete: false,
                  });

                  //add role here
                  await addRoleToUser("public", response.user.id, "user");
                }

                return response;
              }
              return {
                status: "EMAIL_ALREADY_EXISTS_ERROR",
              };
            },
          };
        },
      },
    }),
    ThirdParty.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signInUp: async function (input) {
              //check if user is duplicate login or not
              let existingUsers = await supertokens.listUsersByAccountInfo(
                input.tenantId,
                {
                  email: input.email,
                }
              );
              if (existingUsers.length === 0) {
                // this means this email is new so we allow sign up
                let response = await originalImplementation.signInUp(input);

                if (response.status === "OK") {
                  if (input.session === undefined) {
                    if (
                      response.createdNewRecipeUser &&
                      response.user.loginMethods.length === 1
                    ) {
                      await UserMetadata.updateUserMetadata(response.user.id, {
                        bIsUserInfoComplete: false,
                        bIsMembershipPaymentComplete: false,
                      });

                      //add role here
                      await addRoleToUser("public", response.user.id, "user");
                    }
                  }
                }

                return response;
              }
              if (
                existingUsers.find(
                  (u) =>
                    u.loginMethods.find(
                      (lM) =>
                        lM.hasSameThirdPartyInfoAs({
                          id: input.thirdPartyId,
                          userId: input.thirdPartyUserId,
                        }) && lM.recipeId === "thirdparty"
                    ) !== undefined
                )
              ) {
                // this means we are trying to sign in with the same social login. So we allow it
                let response = await originalImplementation.signInUp(input);

                if (response.status === "OK") {
                  if (input.session === undefined) {
                    if (
                      response.createdNewRecipeUser &&
                      response.user.loginMethods.length === 1
                    ) {
                      await UserMetadata.updateUserMetadata(response.user.id, {
                        bIsUserInfoComplete: false,
                        bIsMembershipPaymentComplete: false,
                      });

                      //add role here
                      await addRoleToUser("public", response.user.id, "user");
                    }
                  }
                }

                return response;
              }
              // this means that the email already exists with another social or email password login method, so we throw an error.
              throw new Error("Cannot sign up as email already exists");
            },
          };
        },
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            signInUpPOST: async function (input) {
              try {
                return await originalImplementation.signInUpPOST!(input);
              } catch (err: any) {
                if (err.message === "Cannot sign up as email already exists") {
                  // this error was thrown from our function override above.
                  // so we send a useful message to the user
                  return {
                    status: "GENERAL_ERROR",
                    message:
                      "Seems like you already have an account with another method. Please use that instead.",
                  };
                }
                throw err;
              }
            },
          };
        },
      },
      signInAndUpFeature: {
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
                  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
                },
              ],
            },
          },
        ],
      },
    }),
    Session.init(), // initializes session features
    Dashboard.init(),
    UserMetadata.init(),
    UserRoles.init(),
  ];
}

export async function createRoles() {
  /**
   * You can choose to give multiple or no permissions when creating a role
   * createNewRoleOrAddPermissions("user", []) - No permissions
   * createNewRoleOrAddPermissions("user", ["read", "write"]) - Multiple permissions
   */
  const adminRole = await UserRoles.createNewRoleOrAddPermissions("admin", [
    "read",
    "write",
  ]);
  const execRole = await UserRoles.createNewRoleOrAddPermissions("exec", [
    "read",
    "write",
  ]);
  const userRole = await UserRoles.createNewRoleOrAddPermissions("user", []);

  if (userRole.createdNewRole === false) {
    // The role already exists
  }
  if (execRole.createdNewRole === false) {
    // The role already exists
  }
  if (adminRole.createdNewRole === false) {
    // The role already exists
  }
}
