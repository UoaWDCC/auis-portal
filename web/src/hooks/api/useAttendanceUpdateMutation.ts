import { useMutation } from "@tanstack/react-query";
import { postAttendanceUpdate } from "../../api/apiRequests";
import { AttendanceReturn } from "../../types/types";


export const useUpdateUserName = () => {
    return useMutation<AttendanceReturn, Error, { peopleTicketId: number; attendance: boolean }>(
      {mutationFn: ({ peopleTicketId, attendance }) => postAttendanceUpdate(peopleTicketId, attendance)
    });
  };