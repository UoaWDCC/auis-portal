import axios from "axios";
import { QuestionAnswer, TicketAndQuestion } from "../../types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getTicketQuestions } from "../../graphql/queries";
import { Mapper } from "@utils/Mapper";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import { useNavigate } from "react-router";
import CheckoutInformationForm from "./CheckoutInformationForm";

export default function CheckoutInformation({
  ticketId,
  setInfoEntered,
}: {
  ticketId: number;
  setInfoEntered: Dispatch<SetStateAction<boolean>>;
}) {
  // navigate
  const navigate = useNavigate();

  // get questions
  const {
    loading: ticketAndQuestionsLoading,
    data: ticketAndQuestionsData,
    error: ticketAndQuestionsError,
  } = useQuery(getTicketQuestions({ id: ticketId }));

  // Take user to top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect
  useEffect(() => {
    if (!ticketAndQuestionsLoading) {
      TicketAndQuestions(false);
    }
    if (ticketAndQuestionsError) {
      setErrorTicketAndQuestions(true);
    }
    if (ticketAndQuestionsData) {
      try {
        const mappedTicketAndQuestions = Mapper.mapToTicketQuestion(
          ticketAndQuestionsData
        );
        setTicketAndQuestions(mappedTicketAndQuestions);
      } catch (error) {
        setErrorTicketAndQuestions(true);
      }
    }
  }, [
    ticketAndQuestionsData,
    ticketAndQuestionsError,
    ticketAndQuestionsLoading,
  ]);

  // States
  const [ticketAndQuestions, setTicketAndQuestions] =
    useState<TicketAndQuestion>();
  const [loadingTicketAndQuestions, TicketAndQuestions] = useState(true);
  const [errorTicketAndQuestions, setErrorTicketAndQuestions] = useState(false);

  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Submit ticket information to backend
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/api/user/user-ticket-info", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        // Form Submission Successful
        setSubmitLoading(false);
        // Move user to payment
        setInfoEntered(true);
      } else {
        setSubmitLoading(false);
        // Form Submission Failed
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitLoading(false);
      setSubmitError(true);
      // Error
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    phoneNumber: string,
    answers: QuestionAnswer[]
  ) => {
    event.preventDefault();
    setSubmitLoading(true);

    const answerList = answers.map(
      ({ question, checkForMemberEmail, indexId, ...rest }) => {
        return rest;
      }
    );

    onSubmit({
      ticketId: ticketId,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      answers: answerList,
    });
  };
  // Loading
  if (loadingTicketAndQuestions || submitLoading) {
    return <LoadingSpinner />;
  }

  // Error
  if (errorTicketAndQuestions) {
    navigate("/error");
  }

  return ticketAndQuestions ? (
    <div className="drop-shadow-all mb-20 w-full rounded-lg bg-white px-2 py-12 sm:px-12">
      <CheckoutInformationForm
        handleSubmit={handleSubmit}
        questions={ticketAndQuestions}
        submitError={submitError}
      />
    </div>
  ) : (
    <></>
  );
}
