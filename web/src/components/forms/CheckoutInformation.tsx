import axios from "axios";
import TicketInformationQuestion from "./TicketInformationQuestion";
import { Question } from "../../types/types";
import { useEffect, useState } from "react";
import TicketQuestion from "./TicketQuestion";

// const TicketInformationSchema = z.object({
//   name: z.string().max(40).min(1),
//   email: z.string().email(),
//   phoneNumber: z.string().max(15).min(6),
// });

// type TicketInformationSchemaType = z.infer<typeof TicketInformationSchema>;

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
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<TicketInformationSchemaType>({
  //   resolver: zodResolver(TicketInformationSchema),
  // });

  // //we should here call like API or something...
  // const onSubmit: SubmitHandler<TicketInformationSchemaType> = (data) => {
  //   sendData(data);
  // };
  console.log(questions);

  interface QuestionAnswer {
    question: string;
    questionId: number;
    checkForMemberEmail: boolean;
    // questiona: Question
    indexId: number;
    answer: string;
  }
  var defaultAnswers: QuestionAnswer[] = [];
  for (var i: number = 0; i < questions.length; i++) {
    defaultAnswers.push({
      question: questions[i].question,
      questionId: questions[i].id,
      checkForMemberEmail: questions[i].checkForMemberEmail,
      indexId: i,
      answer: "",
    });
  }
  var answers = defaultAnswers;
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      console.log("invalid email");
    }
    if (!validateName(name)) {
      console.log("invalid name");
    }
    if (!validatePhoneNumber(phoneNumber)) {
      console.log("invalid phone number");
    }
    var temp = { name, email, phoneNumber, answers };

    const newArr = answers.map(
      ({ question, checkForMemberEmail, indexId, ...rest }) => {
        return rest;
      }
    );

    if (!validateAnswers(newArr)) {
      console.log("answers too long");
    }

    console.log(temp);

    console.log({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      answers: newArr,
    });
    // alert(`The name you entered was: ${name}`);

    sendData({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      answers: newArr,
    });
  };

  function onAnswerChange(
    e: React.ChangeEvent<HTMLInputElement>,
    indexId: number
  ) {
    // setAnswers([...answers, [indexId]: e.target.value])
    answers[indexId].answer = e.target.value;
  }

  function validateEmail(text: string) {
    return (
      text.length > 0 &&
      text.length < 99 &&
      text
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    );
  }

  function validateName(text: string) {
    return text.length > 0 && text.length < 99;
  }

  function validatePhoneNumber(text: string) {
    return (
      text.length > 6 &&
      text.length < 20 &&
      text
        .toLowerCase()
        .match(/^(([0-9\ \+\_\-\,\.\^\*\?\$\^\#\(\)])|(ext|x)){1,20}$/)
    );
  }

  function validateAnswers(
    text: {
      questionId: number;
      answer: string;
    }[]
  ) {
    var valid : boolean = true

    text.map((item) => {
      console.log(item.answer.length)
      if (item.answer.length > 20 || !item.answer.toLowerCase().match(/^(?=.*[a-zA-Z\d].*)[a-zA-Z\d!@#$%&*]{7,}$/)) {
        valid = false;
      }
    });

    return valid;
  }

  return (
    <div className="drop-shadow-all w-[36rem] rounded-lg bg-white px-2 py-12 sm:px-12">
      <div className=" ">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          {/* <div className="py-2">
        error && <span className="text-red-500">{errorMessage}</span>}
      </div> */}
          {/* <TicketInformationQuestion
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
          /> */}
          <label className="flex items-center justify-center py-3 text-center text-xl">
            Enter your name:
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
          />
          <label className="flex items-center justify-center py-3 text-center text-xl">
            Enter your email:
          </label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
          />
          <label className="flex items-center justify-center py-3 text-center text-xl">
            Enter your phone number
          </label>
          <input
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
          />
          {answers.map((question) => (
            // <div>
            //   <label className="flex items-center justify-center py-3 text-center text-xl">
            //     {question.question}
            //   </label>
            //   <input
            //     type="text"
            //     value={name}
            //     onChange={(e) => setName(e.target.value)}
            //     className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
            //   />
            // </div>
            <TicketQuestion
              question={question.question}
              indexId={question.indexId}
              onAnswerChange={onAnswerChange}
            />
          ))}

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
