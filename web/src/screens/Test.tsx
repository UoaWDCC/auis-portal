// import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

import SomePhotos from "../components/SomePhotos";
import Partners from "../components/Partners";

function TestScreen() {
  return (
    <div>
      <Partners />
      <SomePhotos />
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
