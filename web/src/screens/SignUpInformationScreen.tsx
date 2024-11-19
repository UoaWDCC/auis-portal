import SignUpInformation from "@components/forms/SignUpInformation";
import UserInformationForm from "@components/UserInformationForm";

function SignUpInformationScreen({ navbar }: { navbar: JSX.Element }) {
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
      {/* move logic to this component */}
      {/* <UserInformationForm /> */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-white">
          We just need a little bit more information about you!
        </h1>
      </div>
      <div className="flex items-center justify-center py-12">
        <SignUpInformation />
      </div>
    </div>
  );
}

export default SignUpInformationScreen;
