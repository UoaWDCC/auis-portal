import { FieldError, UseFormRegister } from "react-hook-form";

interface QuestionProps {
  question: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
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

export default function TextQuestion({
  question,
  placeholder,
  name,
  register,
  error,
  errorMessage,
}: QuestionProps) {
  return (
    <div>
      <label className="flex items-center justify-center pb-3 text-center text-xl">
        {question}
      </label>
      <input
        className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
        placeholder={placeholder}
        {...register(name)}
      />
      <div className="py-2">
        {error && <span className="text-red-500">{errorMessage}</span>}
      </div>
    </div>
  );
}
