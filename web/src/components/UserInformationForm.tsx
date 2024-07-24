import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import FormInput from '../components/FormInput';

function UserInformationForm() {
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      university: '',
      graduationYear: '',
      UPI: '',
      studentID: '',
      studyOption: '',
      residency: '',
      duration: '',
    },
  });

  const residencyOptions = ["International", "Domestic"];
  const paymentOptions = ["One Semester ($8)", "Two Semesters ($15)"];

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/submitForm", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Form submitted successfully");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-w-screen flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-lg p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Thanks for joining!{" "}
          <span role="img" aria-label="emoji">
            😊
          </span>{" "}
          We just need a bit more info about your membership—it'll be quick!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0">
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">First Name</label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is Required" }}
                render={({ field }) => <FormInput {...field} placeholder="e.g Clark" />}
              />
              {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">Last Name</label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is Required" }}
                render={({ field }) => <FormInput {...field} placeholder="e.g Kent" />}
              />
              {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0">
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">University (or alumni) 🎓</label>
              <Controller
                name="university"
                control={control}
                rules={{ required: "Your University is Required" }}
                render={({ field }) => <FormInput {...field} placeholder="e.g University of Auckland" />}
              />
              {errors.university && <span className="text-red-500">{errors.university.message}</span>}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">What year are you in (or alumni) 📅</label>
              <Controller
                name="graduationYear"
                control={control}
                rules={{ required: "Your Graduation Year is Required" }}
                render={({ field }) => <FormInput {...field} placeholder="e.g Year 3" />}
              />
              {errors.graduationYear && <span className="text-red-500">{errors.graduationYear.message}</span>}
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0">
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">Student ID (if you have one) 🆔</label>
              <Controller
                name="studentID"
                control={control}
                render={({ field }) => <FormInput {...field} placeholder="e.g 1234566789.." />}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">UPI (if you have one) 🆔</label>
              <Controller
                name="UPI"
                control={control}
                render={({ field }) => <FormInput {...field} placeholder="e.g abcd123.." />}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0">
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">What are you studying? 📚</label>
              <Controller
                name="studyOption"
                control={control}
                render={({ field }) => <FormInput {...field} placeholder="e.g Software Engineering" />}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">Domestic or International? 🌏</label>
              <Controller
                name="residency"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 flex flex-col md:flex-row md:items-center">
                    {residencyOptions.map((option, index) => (
                      <label key={option} className={`inline-flex items-center ${index !== 0 ? "ml-0 md:ml-6" : ""}`}>
                        <input
                          type="radio"
                          {...field}
                          value={option}
                          checked={field.value === option}
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-start md:items-center md:space-x-7">
            <label className="text-gray-700">Membership Types 💳</label>
            <Controller
              name="duration"
              control={control}
              rules={{ required: "Membership Type is Required" }}
              render={({ field }) => (
                <div className="mt-2 flex flex-col md:flex-row md:items-center">
                  {paymentOptions.map((option, index) => (
                    <label key={option} className={`inline-flex items-center ${index !== 0 ? "ml-0 md:ml-6" : ""}`}>
                      <input
                        type="radio"
                        {...field}
                        value={option}
                        checked={field.value === option}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.duration && <span className="text-red-500">{errors.duration.message}</span>}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800"
          >
            Purchase membership
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInformationForm;
