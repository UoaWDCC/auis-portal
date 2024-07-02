import FormInput from "@components/FormInput.tsx"
import { useState } from "react"

function UserInformationForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    university: "",
    graudationYear: "",
    UPI: "",
    studentID: "",
    studyOption: ""
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Need to do validation here
    setValues({ ...values, [e.target.name]: e.target.value })
    console.log(values)
  }

  const residencyOptions = ["International", "Domestic"]
  const paymentOptions = ["One Semester ($8)", "Two Semesters ($15)"]

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("submitted")
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          We need some more information for your membership
        </h2>

        <form onSubmit={handleSubmit}>
          <FormInput
            placeholder={"First Name"}
            id="firstName"
            errorMessage="First Name is Required"
            onChange={onChange}
          />
          <FormInput
            placeholder={"Last Name"}
            id="lastName"
            errorMessage="Last Name is Required"
            onChange={onChange}
          />
          <FormInput
            placeholder={"University (or alumni)"}
            id="university"
            errorMessage="Your Univeristiy is Required"
            onChange={onChange}
          />
          <FormInput
            placeholder={"What year are you in (or alumni)"}
            id="year"
            errorMessage="Your Graduation Year is Required"
            onChange={onChange}
          />
          <FormInput
            placeholder={"UPI (if you have one)"}
            id="upi"
            onChange={onChange}
          />
          <FormInput
            placeholder={"Student ID (if you have one)"}
            id="studentId"
            onChange={onChange}
          />
          <FormInput
            placeholder={"What are you studying)"}
            id="study"
            onChange={onChange}
          />

          <FormInput type="radio" name="residency" options={residencyOptions} />
          <FormInput type="radio" name="duration" options={paymentOptions} />

          <button className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800">
            Purchase membership
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserInformationForm
