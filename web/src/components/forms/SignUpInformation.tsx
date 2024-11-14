import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

const SignUpSchema = z.object({
  //   email: z.string().email(),
  //   password: z.string().min(3).max(20)
  name: z.string().max(40).min(1),
  universityId: z.string().max(15).min(2),
  upi: z.string().max(15).min(2),
  yearOfStudy: z.enum([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "Other",
    "Postgraduate",
    "Alumni",
  ]),
  fieldOfStudy: z.string().max(40).min(1),
  isDomestic: z.enum(["Domestic Student", "International Student", "N/A"]),
  institution: z.enum([
    "The University of Auckland",
    "Auckland University of Technology",
    "Other",
    "None",
  ]),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const sendData = async (data: any) => {
  // TODO: update type
  console.log(data);
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

export default function SignUpInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const [yearOfStudyDropdownTouched, setYearOfStudyDropdownTouched] =
    useState<boolean>(false);
  const [isDomesticDropdownTouched, setIsDomesticDropdownTouched] =
    useState<boolean>(false);
  const [institutionDropdownTouched, setInstitutionDropdownTouched] =
    useState<boolean>(false);

  //we should here call like API or something...
  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    sendData(data);
  };

  const yearOfStudyOptions = [
    { id: 0, text: "0" },
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
    { id: 5, text: "5" },
    { id: 6, text: "6" },
    { id: 7, text: "Other" },
    { id: 8, text: "Postgraduate" },
    { id: 9, text: "Alumni" },
  ];

  const isDomesticOptions = [
    { id: 0, text: "Domestic Student" },
    { id: 1, text: "International Student" },
    { id: 2, text: "N/A" },
  ];

  const institutionOptions = [
    { id: 0, text: "The University of Auckland" },
    { id: 1, text: "Auckland University of Technology" },
    { id: 2, text: "Other" },
    { id: 3, text: "None" },
  ];

  return (
    <div className="drop-shadow-all w-[36rem] rounded-lg bg-white p-12">
      <div className=" ">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <label className="flex items-center justify-center pb-3 text-center text-xl">
            Enter your name
          </label>
          <input
            className="input flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
            placeholder="Eg. John Smith"
            {...register("name")}
          />
          <div className="py-2">
            {errors.name && (
              <span className="text-red-500">Please enter your full name</span>
            )}
          </div>

          <label className="flex items-center justify-center pb-3 text-center text-xl">
            University ID number
          </label>
          <input
            className="input flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
            placeholder={"Enter 000000000 if you don't have one..."}
            {...register("universityId")}
          />
          <div className="py-2">
            {errors.universityId && (
              <span className="text-red-500">Please enter your ID number</span>
            )}
          </div>

          <label className="flex items-center justify-center pb-3 text-xl">
            Enter your UPI Number
          </label>
          <input
            className="input flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
            placeholder="Enter 0000000 if you don't have one..."
            {...register("upi")}
          />
          <div className="py-2">
            {errors.upi && (
              <span className="text-red-500">Please enter your UPI</span>
            )}
          </div>

          <label className="flex items-center justify-center pb-3 text-xl">
            Enter your year of study
          </label>
          <select
            onInput={() => setYearOfStudyDropdownTouched(true)}
            className={`input flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight shadow focus:outline-none ${yearOfStudyDropdownTouched ? "text-black" : "text-gray-400"} `}
            {...register("yearOfStudy")}
          >
            <option
              className="flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight text-gray-400 shadow focus:outline-none"
              disabled
              selected
            >
              Select your option
            </option>
            {yearOfStudyOptions.map((item) => (
              <option className="flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight text-black shadow focus:outline-none">
                {item.text}
              </option>
            ))}
          </select>
          <div className="py-2">
            {errors.yearOfStudy && (
              <span className="text-red-500">
                Please select a year of study
              </span>
            )}
          </div>

          <label className="flex items-center justify-center pb-3 text-xl">
            Enter your field of study
          </label>
          <input
            className="input flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
            placeholder="Eg. Software Engineering"
            {...register("fieldOfStudy")}
          />
          <div className="py-2">
            {errors.fieldOfStudy && (
              <span className="text-red-500">
                Please enter your field of study
              </span>
            )}
          </div>

          <label className="flex items-center justify-center pb-3 text-xl">
            Enter student study status
          </label>
          <select
            onInput={() => setIsDomesticDropdownTouched(true)}
            className={`input flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight shadow focus:outline-none ${isDomesticDropdownTouched ? "text-black" : "text-gray-400"} `}
            {...register("isDomestic")}
          >
            <option
              className="flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight text-gray-400 shadow focus:outline-none"
              disabled
              selected
            >
              Select your option
            </option>
            {isDomesticOptions.map((item) => (
              <option className="flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight text-black shadow focus:outline-none">
                {item.text}
              </option>
            ))}
          </select>
          <div className="py-2">
            {errors.isDomestic && (
              <span className="text-red-500">
                Please select a student status
              </span>
            )}
          </div>

          <label className="flex items-center justify-center pb-3 text-xl">
            Enter the institute you study at
          </label>

          <select
            onInput={() => setInstitutionDropdownTouched(true)}
            className={`input flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight shadow focus:outline-none ${institutionDropdownTouched ? "text-black" : "text-gray-400"} `}
            {...register("institution")}
          >
            <option
              className="flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight text-gray-400 shadow focus:outline-none"
              disabled
              selected
            >
              Select your option
            </option>
            {institutionOptions.map((item) => (
              <option className="flex w-full items-center justify-center rounded border px-3 py-2 text-lg leading-tight text-black shadow focus:outline-none">
                {item.text}
              </option>
            ))}
          </select>
          <div className="py-2">
            {errors.institution && (
              <span className="text-red-500">Please select an institute</span>
            )}
          </div>

          <div className="flex items-center justify-center pt-5">
            <button
              className="bg-primary-orange rounded-2xl px-10 py-3 text-xl font-bold text-white transition-all hover:scale-110"
              type="submit"
            >
              Submit!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
