import FormInput from "@components/FormInput.tsx";
import { useState } from "react";
import axios from "axios";

function UserInformationForm() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        university: "",
        graduationYear: "",
        UPI: "",
        studentID: "",
        studyOption: "",
        residency: "",
        duration: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        university: "",
        graduationYear: "",
        duration: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const residencyOptions = ["International", "Domestic"];
    const paymentOptions = ["One Semester ($8)", "Two Semesters ($15)"];

    const validate = () => {
        const newErrors = {
            firstName: values.firstName ? "" : "First Name is Required",
            lastName: values.lastName ? "" : "Last Name is Required",
            university: values.university ? "" : "Your University is Required",
            graduationYear: values.graduationYear ? "" : "Your Graduation Year is Required",
            duration: values.duration ? "" : "Membership Type is Required",
        };
        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            const payload = { ...values };

            try {
                const response = await axios.post('/api/submitForm', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    console.log('Form submitted successfully');
                } else {
                    console.error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <div className="flex items-center justify-center min-w-screen">
            <div className="p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Thanks for joining! <span role="img" aria-label="emoji">😊</span> We just need a bit more info about your membership—it'll be quick!
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex space-x-7">
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">First Name</label>
                            <FormInput
                                placeholder="e.g Clark"
                                name="firstName"
                                errorMessage={errors.firstName}
                                onChange={onChange}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">Last Name</label>
                            <FormInput
                                placeholder="e.g Kent"
                                name="lastName"
                                errorMessage={errors.lastName}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-7">
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">University (or alumni) <span role="img" aria-label="emoji">🎓</span></label>
                            <FormInput
                                placeholder="e.g University of Auckland"
                                name="university"
                                errorMessage={errors.university}
                                onChange={onChange}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">What year are you in (or alumni) <span role="img" aria-label="emoji">📅</span></label>
                            <FormInput
                                placeholder="e.g Year 3"
                                name="graduationYear"
                                errorMessage={errors.graduationYear}
                                onChange={onChange}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-7">
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">Student ID (if you have one) <span role="img" aria-label="emoji">🆔</span></label>
                            <FormInput placeholder="e.g 1234566789.." name="studentID" onChange={onChange} />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">UPI (if you have one) <span role="img" aria-label="emoji">🆔</span></label>
                            <FormInput placeholder="e.g abcd123.." name="UPI" onChange={onChange} />
                        </div>
                    </div>

                    <div className="flex space-x-7">
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">What are you studying? <span role="img" aria-label="emoji">📚</span></label>
                            <FormInput placeholder="e.g Software Engineering" name="studyOption" onChange={onChange} />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-700">Domestic or International? <span role="img" aria-label="emoji">🌏</span></label>
                            <FormInput type="radio" name="residency" options={residencyOptions} onChange={onChange} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-4">
                        <label className="text-gray-700">Membership Types <span role="img" aria-label="emoji">💳</span></label>
                        <FormInput type="radio" name="duration" options={paymentOptions} errorMessage={errors.duration} onChange={onChange} />
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
