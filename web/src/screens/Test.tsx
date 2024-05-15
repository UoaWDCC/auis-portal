import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

function TestScreen() {
    return (
        <div className="flex-col justify-center">
            <h2> Test Screen</h2>
            <header>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </header>
        </div>
    )
}

export default TestScreen