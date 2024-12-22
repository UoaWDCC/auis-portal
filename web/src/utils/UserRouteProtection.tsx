import { SessionAuth } from "supertokens-auth-react/recipe/session";
import ErrorScreen from "../screens/ErrorScreen";

export const UserRoute = (props: React.PropsWithChildren<any>) => {
  return (
    <SessionAuth
      accessDeniedScreen={ErrorScreen}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
      ]}
    >
      {props.children}
    </SessionAuth>
  );
};
