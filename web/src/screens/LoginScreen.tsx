import { SignIn } from "@clerk/clerk-react"

function LoginScreen() {
  return (
    <div className="flex h-full flex-grow flex-col">
      <div className="flex flex-grow justify-center">
        <div className="flex flex-1 items-center justify-center">
          <SignIn />
        </div>
        <div
          className="justify-top flex flex-1 flex-col items-center pt-20 text-center"
          style={{
            background: "linear-gradient(to top, #ccf2ff 50%, #ffffff 100%)"
          }}
        >
          <div className="mb-5">
            <img
              src="/src/assets/peacock.png"
              alt="Descriptive Text"
              className="max-h-[300px] max-w-[300px]"
            />
          </div>
          <div>
            <img
              src="/src/assets/AUIS_black_3.png"
              alt="Descriptive Text"
              className="max-h-xs max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
