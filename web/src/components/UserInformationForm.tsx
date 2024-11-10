import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import FormInput from "../components/FormInput";

function UserInformationForm() {
  // TODO: move onSubmit to parent component. 
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      university: "",
      graduationYear: "",
      UPI: "",
      studentID: "",
      studyOption: "",
      residency: "",
      duration: "",
    },
  });

  const residencyOptions = ["International", "Domestic"];

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/submitForm", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        //Form Submission Successful
      } else {
        // Form Submission Failed
      }
    } catch (error) {
      // Error
    }
  };

  return (
    <div className="  flex items-center justify-center">
      <div className="bg-white m-4 max-w-3xl rounded-lg p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Thanks for joining!{" "}
          <span role="img" aria-label="emoji">
            😊
          </span>{" "}
          We just need a little bit more information about you!
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0">
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">First Name</label>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is Required" }}
                render={({ field }) => (
                  <FormInput {...field} placeholder="e.g John" />
                )}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">Last Name</label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is Required" }}
                render={({ field }) => (
                  <FormInput {...field} placeholder="e.g Smith" />
                )}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0">
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">University (or alumni) 🎓</label>
              <Controller
                name="university"
                control={control}
                rules={{ required: "Your University is Required" }}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    placeholder="e.g University of Auckland"
                  />
                )}
              />
              {errors.university && (
                <span className="text-red-500">
                  {errors.university.message}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">
                What year are you in (or alumni) 📅
              </label>
              <Controller
                name="graduationYear"
                control={control}
                rules={{ required: "Your Graduation Year is Required" }}
                render={({ field }) => (
                  <FormInput {...field} placeholder="e.g Year 3" />
                )}
              />
              {errors.graduationYear && (
                <span className="text-red-500">
                  {errors.graduationYear.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0">
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">
                Student ID (if you have one) 🆔
              </label>
              <Controller
                name="studentID"
                control={control}
                render={({ field }) => (
                  <FormInput {...field} placeholder="e.g 1234566789.." />
                )}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">UPI (if you have one) 🆔</label>
              <Controller
                name="UPI"
                control={control}
                render={({ field }) => (
                  <FormInput {...field} placeholder="e.g abcd123.." />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-7 md:space-y-0">
            <div className="flex flex-1 flex-col">
              <label className="text-gray-700">What are you studying? 📚</label>
              <Controller
                name="studyOption"
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    placeholder="e.g Software Engineering"
                  />
                )}
              />
            </div>
            <div className="flex flex-1 flex-col ">
              <label className="text-gray-700">
                Domestic or International? 🌏
              </label>
              <Controller
                name="residency"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 flex flex-col md:flex-row md:items-center ">
                    {residencyOptions.map((option, index) => (
                      <label
                        key={option}
                        className={`inline-flex items-center ${index !== 0 ? "ml-0 md:ml-6" : ""}`}
                      >
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

          <button
            type="submit"
            className="bg-primary-orange text-md  rounded-lg px-5 py-3 font-bold text-white transition-all hover:scale-105"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInformationForm;
