// import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

// import SomePhotos from "../components/SomePhotos";
import Partners from "../components/Partners";
import Values from "../components/Values";
import Introductions from "@components/Introductions";

function TestScreen() {
  return (
    <div className="grid grid-cols-3 gap-1">
      <Partners />
      {/* <SomePhotos /> */}
      <Values />
      <Introductions />
    </div>
  );
}
// function TestScreen() {
//     return (
//         <div className="flex justify-between">
//             <h2> Test Screen</h2>
//             <header>
//                 <SignedOut>
//                     <SignInButton/>
//                 </SignedOut>
//                 <SignedIn>
//                     <UserButton/>
//                 </SignedIn>
//             </header>
//         </div>
//     )
// }

export default TestScreen;
