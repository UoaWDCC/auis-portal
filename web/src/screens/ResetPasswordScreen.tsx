import { ResetPasswordUsingToken } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

export default function ResetPasswordScreen() {
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal h-svh bg-gradient-to-b pb-20">
      <div className="flex h-full items-center justify-center">
        <div>
          <ResetPasswordUsingToken />
        </div>
      </div>
    </div>
  );
}
