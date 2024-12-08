import { useMutation } from "@tanstack/react-query";
import { postAttendanceUpdate as PatchAttendanceUpdate } from "../../api/apiRequests";
import { AttendanceReturn } from "../../types/types";


export const useUpdateAttendance = () => {
    return useMutation<AttendanceReturn, Error, { peopleTicketId: number; attendance: boolean }>(
      {mutationFn: ({ peopleTicketId, attendance }) => PatchAttendanceUpdate(peopleTicketId, attendance)
    });
  };