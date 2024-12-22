import { QuestionAnswer, TicketAndQuestion } from "../../types/types";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { getTicketQuestions } from "../../graphql/queries";
import { Mapper } from "@utils/Mapper";
import LoadingSpinner from "@components/navigation/LoadingSpinner";
import { useNavigate } from "react-router";
import CheckoutInformationForm from "./CheckoutInformationForm";
import { useUpdateUserTicketInfo } from "../../hooks/api/useUpdateUserTicketInfo";

interface CheckoutInformationProps {
  ticketId: number;
  navigateToPaymentScreen(userTicketId: number): void;
}

export default function CheckoutInformation({
  ticketId,
  navigateToPaymentScreen,
}: CheckoutInformationProps) {
  // navigate
  const navigate = useNavigate();

  // get questions
  const {
    loading: ticketAndQuestionsLoading,
    data: ticketAndQuestionsData,
    error: ticketAndQuestionsError,
  } = useQuery(getTicketQuestions({ id: ticketId }));

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

  // Take user to top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // States
  const [ticketAndQuestions, setTicketAndQuestions] =
    useState<TicketAndQuestion>();
  const [loadingTicketAndQuestions, TicketAndQuestions] = useState(true);
  const [errorTicketAndQuestions, setErrorTicketAndQuestions] = useState(false);

  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    data: updateUserTicketInfoData,
    mutateAsync,
    status,
  } = useUpdateUserTicketInfo();
  // Update status text as it changes
  useEffect(() => {
    if (status === "success") {
      navigateToPaymentScreen(
        updateUserTicketInfoData.updateUserInfoOrNewUser.userTicketId
      );
    }

    if (status == "pending") {
      setSubmitLoading(true);
    } else {
      setSubmitLoading(false);
    }

    if (status == "error") {
      setSubmitError(true);
    }
  }, [status]);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    phoneNumber: string,
    answers: QuestionAnswer[]
  ) => {
    event.preventDefault();
    // setSubmitLoading(true);

    // remove unused information for post request
    const answerList = answers.map(({ question, indexId, ...rest }) => {
      return rest;
    });

    // Mutation hook
    mutateAsync({
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

  // ensure that ticketAndQuestions exists
  return ticketAndQuestions ? (
    <div className="drop-shadow-all mb-20 w-full rounded-lg bg-white px-2 py-12 sm:px-12">
      <CheckoutInformationForm
        handleSubmit={onSubmit}
        questions={ticketAndQuestions}
        submitError={submitError}
      />
    </div>
  ) : (
    <></>
  );
}
