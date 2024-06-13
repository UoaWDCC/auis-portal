import UserInformationForm from "@components/UserInformationForm.tsx";

function InformationScreen() {
    return (
        <div className="flex-grow flex flex-col justify-center  bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300">
            <UserInformationForm />
        </div>
    );
}

export default InformationScreen;
