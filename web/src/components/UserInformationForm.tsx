import FormInput from "@components/FormInput.tsx";
import { useState } from "react";

function UserInformationForm() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        university: "",
        graduationYear: "",
        UPI: "",
        studentID: "",
        studyOption: ""
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const residencyOptions = ["International", "Domestic"];
    const paymentOptions = ["One Semester ($8)", "Two Semesters ($15)"];

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("submitted");
    }

    return (
        <div className="flex items-center justify-center min-w-screen">
            <div className="p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Thanks for joining! <span role="img" aria-label="emoji">😊</span> We just need a bit more info about your membership—it'll be quick!
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">First Name</label>
                            <FormInput placeholder="e.g Clark" id="firstName" errorMessage="First Name is Required" onChange={onChange} />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">Last Name</label>
                            <FormInput placeholder="e.g Kent" id="lastName" errorMessage="Last Name is Required" onChange={onChange} />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">University (or alumni)</label>
                            <FormInput placeholder="e.g University of Auckland" id="university" errorMessage="Your University is Required" onChange={onChange} />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">What year are you in (or alumni)</label>
                            <FormInput placeholder="e.g Year 3" id="graduationYear" errorMessage="Your Graduation Year is Required" onChange={onChange} />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">Student ID (if you have one)</label>
                            <FormInput placeholder="e.g 1234566789.." id="studentID" onChange={onChange} />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">UPI (if you have one)</label>
                            <FormInput placeholder="e.g abcd123.." id="UPI" onChange={onChange} />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">What are you studying?</label>
                            <FormInput placeholder="e.g Software Engineering" id="studyOption" onChange={onChange} />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">Domestic or International?</label>
                            <FormInput type="radio" name="residency" options={residencyOptions} />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4 mt-4">
                        <label className="text-gray-700">Membership Types</label>
                        <FormInput type="radio" name="duration" options={paymentOptions} />
                    </div>

                    <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 mt-6">
                        Purchase membership
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserInformationForm;
