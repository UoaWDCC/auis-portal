import { SignUp } from "@clerk/clerk-react";

function SignUpScreen() {
    return (
        <div className="flex-grow flex flex-col h-full ">
            <div className="flex flex-grow justify-center ">

                <div className="flex flex-col flex-1 items-center justify-center text-center p-4 "
                     style={{
                         background: 'linear-gradient(to top, #fda642 50%, #ffffff 100%)',
                     }}
                >
                    <div className="mb-5">
                        <img src="/src/assets/react.svg" alt="Descriptive Text" className="min-w-1000 min-h-1000" />
                    </div>
                    <div>
                        <h1>AUIS</h1>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center ">
                    <SignUp />
                </div>
            </div>
        </div>
    );
}

export default SignUpScreen;
