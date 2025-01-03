import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextQuestion from "@components/forms/TextQuestion";
import DropdownQuestion from "@components/forms/DropdownQuestion";
import { useState } from "react";
import { useUpdateUserInfo } from "../hooks/api/useUpdateUserInfo";
import LoadingSpinner from "@components/navigation/LoadingSpinner";

const SignUpSchema = z.object({
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

export default function SignUpInformationScreen({
  navbar,
}: {
  navbar: JSX.Element;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const [formError, setFormError] = useState(false);

  const { status, mutateAsync } = useUpdateUserInfo();

  const sendSignUpData = async (data: SignUpSchemaType) => {
    mutateAsync(data);
  };

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    sendSignUpData(data);
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

  if (status === "success") {
    window.location.href = "/membership";
  }

  if (status === "error") {
    setFormError(true);
  }

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal min-h-[calc(100vh)] bg-gradient-to-b">
      {navbar}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-white">
          We just need a little bit more information about you!
        </h1>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="drop-shadow-all w-[36rem] rounded-lg bg-white px-2 py-12 sm:px-12">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <TextQuestion
                question="Enter your name"
                placeholder="Eg. John Smith"
                name="name"
                register={register}
                error={errors.name}
                errorMessage="Please enter your full name"
              />
              <TextQuestion
                question="University ID number"
                placeholder="Enter 000000000 if you don't have one..."
                name="universityId"
                register={register}
                error={errors.universityId}
                errorMessage="Please enter your ID number"
              />
              <TextQuestion
                question="Enter your UPI number"
                placeholder="Enter 0000000 if you don't have one..."
                name="upi"
                register={register}
                error={errors.upi}
                errorMessage="Please enter your UPI"
              />
              <TextQuestion
                question="Enter your field of study"
                placeholder="Eg. Software Engineering"
                name="fieldOfStudy"
                register={register}
                error={errors.fieldOfStudy}
                errorMessage="Please enter your field of study"
              />
              <DropdownQuestion
                question="Enter your year of study"
                placeholder="Select your option"
                name="yearOfStudy"
                yearOfStudyOptions={yearOfStudyOptions}
                register={register}
                error={errors.yearOfStudy}
                errorMessage="Please select a year of study"
              />
              <DropdownQuestion
                question="Enter student study status"
                placeholder="Select your option"
                name="isDomestic"
                yearOfStudyOptions={isDomesticOptions}
                register={register}
                error={errors.isDomestic}
                errorMessage="Please select a student status"
              />
              <DropdownQuestion
                question="Enter the institute you study at"
                placeholder="Select your option"
                name="institution"
                yearOfStudyOptions={institutionOptions}
                register={register}
                error={errors.institution}
                errorMessage="Please select an institute"
              />

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
          {formError ? (
            <p className="pt-5 text-center text-red-500">
              An error has occured, please try again later
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
