interface TermsAndConditionsProps {
  termsAndConditions: string;
}

export default function TermsAndConditions({
  termsAndConditions,
}: TermsAndConditionsProps) {
  return (
    <>
      <h2 className="px-5 pt-6 text-center text-5xl font-bold md:px-0">
        Terms & Conditions
      </h2>
      <p className="px-5 pt-3 text-center text-xl md:px-3">
        By purchasing this ticket or being a ticket holder, you accept the terms
        and conditions.
      </p>
      <div className="flex justify-center px-5 xl:px-0">
        <p className="mx-2 flex w-[80rem] pt-4 text-left text-xl">
          {termsAndConditions}
        </p>
      </div>
    </>
  );
}
