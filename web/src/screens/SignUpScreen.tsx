import { SignUp } from "@clerk/clerk-react";
import Header from "@components/Header";
import auisLogo from "../assets/peacock_white_inner_hd.png";

function SignUpScreen() {
  return (
    <div className=" min-h-[calc(100vh)] bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal">
      <Header />
      <div className="flex">
        <div className="hidden lg:flex flex-grow items-center justify-center xl:justify-end xl:pr-24">
          <img src={auisLogo} className=" w-[350px] xl:w-[500px]"></img>
        </div>
        <div className="flex flex-grow items-center justify-center xl:justify-start pb-12 xl:pl-24">
          <SignUp afterSignUpUrl="/user-info" />
        </div>
      </div>
    </div>
  );
}

export default SignUpScreen;
