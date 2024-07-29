import UserInformationForm from "@components/UserInformationForm.tsx";
import Header from "@components/Header.tsx";

function InformationScreen() {
  return (
    <div className="flex flex-grow flex-col justify-center">
      <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b">
        <Header />
      </div>
      <div className="bg-gradient-to-b from-white to-orange-100">
        <UserInformationForm />
      </div>
    </div>
  );
}

export default InformationScreen;
