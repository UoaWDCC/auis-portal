import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import TicketInformationQuestion from "./TicketInformationQuestion";
import { Question, TicketAndQuestion } from "../../types/types";

const TicketInformationSchema = z.object({
  name: z.string().max(40).min(1),
  email: z.string().email(),
  phoneNumber: z.string().max(15).min(6),
});

type TicketInformationSchemaType = z.infer<typeof TicketInformationSchema>;

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

export default function CheckoutInformation({
  questions,
}: {
  questions: Question[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketInformationSchemaType>({
    resolver: zodResolver(TicketInformationSchema),
  });

  //we should here call like API or something...
  const onSubmit: SubmitHandler<TicketInformationSchemaType> = (data) => {
    sendData(data);
  };
  console.log(questions);

  return (
    <div className="drop-shadow-all w-[36rem] rounded-lg bg-white px-2 py-12 sm:px-12">
      <div className=" ">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <TicketInformationQuestion
            question="Enter your name"
            placeholder="Eg. John Smith"
            name="name"
            register={register}
            error={errors.name}
            errorMessage="Please enter your name"
          />
          <TicketInformationQuestion
            question="Enter your email"
            placeholder="Eg. name@email.com"
            name="email"
            register={register}
            error={errors.email}
            errorMessage="Please enter your email"
          />
          <TicketInformationQuestion
            question="Enter your phone number"
            placeholder="Eg. 02123456789"
            name="phoneNumber"
            register={register}
            error={errors.phoneNumber}
            errorMessage="Please enter your phone number"
          />

          <div className="flex items-center justify-center pt-5">
            <button
              className="bg-primary-orange rounded-2xl px-10 py-3 text-xl font-bold text-white transition-all hover:scale-110"
              type="submit"
            >
              Submit!
            </button>
            {questions.map((question) => (
              <div className="text-red-500">TESTING {question.question}</div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
