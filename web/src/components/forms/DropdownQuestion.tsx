import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface QuestionProps {
  question: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  yearOfStudyOptions: { text: string }[];
  error: FieldError | undefined;
  errorMessage: string;
}
type FormData = {
  name: string;
  universityId: string;
  upi: string;
  yearOfStudy:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "Other"
    | "Postgraduate"
    | "Alumni";
  fieldOfStudy: string;
  isDomestic: "Domestic Student" | "International Student" | "N/A";
  institution:
    | "Other"
    | "The University of Auckland"
    | "Auckland University of Technology"
    | "None";
};

type ValidFieldNames =
  | "name"
  | "universityId"
  | "upi"
  | "yearOfStudy"
  | "fieldOfStudy"
  | "isDomestic"
  | "institution";

export default function DropdownQuestion({
  question,
  placeholder,
  name,
  yearOfStudyOptions,
  register,
  error,
  errorMessage,
}: QuestionProps) {
  const [yearOfStudyDropdownTouched, setYearOfStudyDropdownTouched] =
    useState<boolean>(false);

  return (
    <div>
      <label className="flex items-center justify-center pb-3 text-center text-xl">
        {question}
      </label>
      <select
        onInput={() => setYearOfStudyDropdownTouched(true)}
        className={`input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none ${yearOfStudyDropdownTouched ? "text-black" : "text-gray-400"} `}
        {...register(name)}
      >
        <option
          className="flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight text-gray-400 shadow focus:outline-none"
          disabled
          selected
        >
          {placeholder}
        </option>
        {yearOfStudyOptions.map((item) => (
          <option className="flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight text-black shadow focus:outline-none">
            {item.text}
          </option>
        ))}
      </select>
      <div className="py-2">
        {error && <span className="text-red-500">{errorMessage}</span>}
      </div>
    </div>
  );
}
