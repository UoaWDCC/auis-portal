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
  const userRole = await UserRoles.createNewRoleOrAddPermissions("user", []);

  if (userRole.createdNewRole === false) {
    // The role already exists
  }
  if (adminRole.createdNewRole === false) {
    // The role already exists
  }
}
