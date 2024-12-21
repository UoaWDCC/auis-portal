import { useMutation } from "@tanstack/react-query";
import { updateUserTicketInfo } from "../../api/apiRequests";
import {
    AnswerList,
  UpdateUserInfoOrNewUser,
} from "../../types/types";

export const useUpdateUserTicketInfo = () => {
  return useMutation<
    UpdateUserInfoOrNewUser,
    Error,
    {
      ticketId: number;
      name: string;
      email: string;
      phoneNumber: string;
      answers: AnswerList[];
    }
  >({
    mutationFn: ({ ticketId, name, email, phoneNumber, answers }) =>
      updateUserTicketInfo(ticketId, name, email, phoneNumber, answers),
  });
};
