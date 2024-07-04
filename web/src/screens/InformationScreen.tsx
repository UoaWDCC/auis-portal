import UserInformationForm from "@components/UserInformationForm.tsx";
import Header from "@components/Header.tsx";

function InformationScreen() {

    return (
        <div className="flex-grow flex flex-col justify-center">
            <div className="bg-gradient-to-b from-AUIS-dark-teal to-AUIS-teal">
                <Header />
            </div>
            <div className="bg-gradient-to-b from-white to-orange-100 ">
                <UserInformationForm />
            </div>
        </div>
    );
}

export default InformationScreen;
