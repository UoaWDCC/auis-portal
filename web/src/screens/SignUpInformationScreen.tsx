import UserInformationForm from "@components/UserInformationForm";

function SignUpInformationScreen({ navbar }: { navbar: JSX.Element }) {
  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
      {/* move logic to this component */}
      <UserInformationForm />
    </div>
  );
}

export default SignUpInformationScreen;
