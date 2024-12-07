import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { AuthPage } from "supertokens-auth-react/ui";
import auisLogo from "../assets/peacock_white_inner_big.png";
import auisAbbrev from "../assets/auis_no_depth.png";

export default function SignInScreen({ navbar }: { navbar: JSX.Element }) {
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
      <div className="flex">
        <div className="hidden flex-grow justify-center lg:flex xl:justify-end xl:pr-24">
          <div className="flex-row">
            <img
              src={auisLogo}
              alt="AUIS Peacock Logo"
              className="w-[350px]"
            ></img>
            <img src={auisAbbrev} alt="AUIS Logo" className="w-[350px]"></img>
          </div>
        </div>
        <div className="flex flex-grow justify-center pb-12 xl:justify-start xl:pl-24">
          <div data-testid="supertokens-sign-in" className="flex">
            <AuthPage
              preBuiltUIList={[EmailPasswordPreBuiltUI, ThirdPartyPreBuiltUI]}
              isSignUp={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}