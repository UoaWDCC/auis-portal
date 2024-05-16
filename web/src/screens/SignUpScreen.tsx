import {SignUp} from "@clerk/clerk-react";

function SignUpScreen() {
    return (
        <div className="flex-grow bg-red-100">
            <h1 className="">
                Custom Sign Up
            </h1>
            <SignUp />
        </div>
    )
}

export default SignUpScreen