import {SignUp} from "@clerk/clerk-react";

function SignUpScreen() {
    return (
        <div className="flex-grow bg-white flex flex-col">
            <div className="flex justify-center my-5">
                <h1 className="text-black font-bold">Join Our Vibrant Community Today </h1>
            </div>
            <div className="flex flex-row justify-center mt-5">
                <div className="flex flex-col flex-1 items-center justify-center text-center p-4">
                    <div className="mb-5">
                        <img src="/src/assets/react.svg" alt="Descriptive Text" className="min-w-1000 min-h-1000"/>
                    </div>
                    <div>
                        <h1>Ready to Join Us? Let's get started and set up your account.</h1>
                        <h2>If you already have one, sign in here to access your profile.</h2>
                    </div>
                </div>

                <div className="w-px bg-gray-300 mt-15"></div>

                <div className="flex flex-1 items-center justify-center mt-15">
                    <SignUp/>
                </div>
            </div>

        </div>
    )
}

export default SignUpScreen
