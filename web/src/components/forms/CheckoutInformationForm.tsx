import { useState } from "react";
import TicketQuestion from "./TicketQuestion";
import { QuestionAnswer, TicketAndQuestion } from "../../types/types";
import { FormValidate } from "@utils/FormValidate";

interface CheckoutInformationFormProps {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    phoneNumber: string,
    answers: QuestionAnswer[]
  ) => void;
  questions: TicketAndQuestion;
  submitError: boolean;
}

export default function CheckoutInformationForm({
  handleSubmit: postInformation,
  questions,
  submitError,
}: CheckoutInformationFormProps) {
  // Initialise the dynamic answer list
  var defaultAnswers: QuestionAnswer[] = [];
  for (var i: number = 0; i < questions.questions.length; i++) {
    defaultAnswers.push({
      question: questions.questions[i].question,
      questionId: questions.questions[i].id,
      indexId: i,
      answer: "",
    });
  }

  // Initialise all states
  const [nameInput, setNameInput] = useState<string>("");
  const [errorName, setErrorName] = useState(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [answerList, setAnswerList] =
    useState<QuestionAnswer[]>(defaultAnswers);
  const [errorAnswer, setErrorAnswer] = useState(false);

  // Update the dynamic answers list
  function handleUpdateAnswerList(indexId: number, updateValue: string) {
    const myNextList = [...answerList];
    const answerItem = myNextList.find((a) => a.indexId === indexId);
    if (answerItem) {
      answerItem.answer = updateValue;
    }
    setAnswerList(myNextList);
  }

  // handle dynamic answer change
  function onAnswerChange(
    e: React.ChangeEvent<HTMLInputElement>,
    indexId: number
  ) {
    handleUpdateAnswerList(indexId, e.target.value);
  }

  // Form validation prior to sending information to parent component for the post request
  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    phoneNumber: string,
    answers: QuestionAnswer[]
  ) => {
    event.preventDefault();

    // form validation
    if (!FormValidate.validateEmail(emailInput)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    if (!FormValidate.validateName(nameInput)) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
    if (!FormValidate.validatePhoneNumber(phoneNumberInput)) {
      setErrorPhoneNumber(true);
    } else {
      setErrorPhoneNumber(false);
    }
    if (!FormValidate.validateAnswers(answerList)) {
      setErrorAnswer(true);
    } else {
      setErrorAnswer(false);
    }

    // send post request
    if (
      FormValidate.validateAll(
        (name = nameInput),
        (email = emailInput),
        (phoneNumber = phoneNumberInput),
        (answers = answerList)
      )
    ) {
      postInformation(event, name, email, phoneNumber, answers);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) =>
          handleSubmit(e, nameInput, emailInput, phoneNumberInput, answerList)
        }
        className="form"
      >
        <label className="flex items-center justify-center py-3 text-center text-xl">
          Enter your name:
        </label>
        <input
          type="text"
          onChange={(e) => setNameInput(e.target.value)}
          className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
        />
        {errorName ? (
          <p className="mt-1 text-center text-red-500">
            Please enter your name
          </p>
        ) : (
          <></>
        )}
        <label className="flex items-center justify-center py-3 text-center text-xl">
          Enter your email:
        </label>
        <input
          type="text"
          onChange={(e) => setEmailInput(e.target.value)}
          className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
        />
        {errorEmail ? (
          <p className="mt-1 text-center text-red-500">
            Please enter your email
          </p>
        ) : (
          <></>
        )}
        <label className="flex items-center justify-center py-3 text-center text-xl">
          Enter your phone number
        </label>
        <input
          type="text"
          onChange={(e) => setPhoneNumberInput(e.target.value)}
          className="input flex w-full items-center justify-center rounded-xl border px-3 py-2 text-lg leading-tight shadow focus:outline-none"
        />
        {errorPhoneNumber ? (
          <p className="mt-1 text-center text-red-500">
            Please enter your phone number
          </p>
        ) : (
          <></>
        )}
        {answerList.map((question) => (
          <TicketQuestion
            key={question.questionId}
            question={question.question}
            indexId={question.indexId}
            onAnswerChange={onAnswerChange}
          />
        ))}
        {errorAnswer ? (
          <p className="mt-1 text-center text-red-500">
            The maximum length for each answer is 50 characters
          </p>
        ) : (
          <></>
        )}
        <div className="flex items-center justify-center pt-5">
          <button
            className="bg-primary-orange rounded-2xl px-10 py-3 text-xl font-bold text-white transition-all hover:scale-110"
            type="submit"
          >
            Continue
          </button>
        </div>
        {submitError ? (
          <p className="mt-2 text-center text-sm text-red-500">
            An error has occurred while submitting, please try again later.
            <br />
            If this is a double ticket, both ticket holders must be members.
            <br />
            If this is a Member ticket, make sure you haven't already purchased
            a Member ticket.
          </p>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
