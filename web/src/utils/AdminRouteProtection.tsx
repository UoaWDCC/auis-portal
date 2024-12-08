import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { UserRoleClaim } from "supertokens-web-js/recipe/userroles";
import ErrorScreen from "../screens/ErrorScreen";

export const ExecRoute = (props: React.PropsWithChildren<any>) => {
    return (
      <SessionAuth
        accessDeniedScreen={ErrorScreen}
        overrideGlobalClaimValidators={(globalValidators) => [
          ...globalValidators,
          UserRoleClaim.validators.includes("exec"),
        ]}
      >
        {props.children}
      </SessionAuth>
    );
  };
  