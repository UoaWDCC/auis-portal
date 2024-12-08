import { useQuery } from "@tanstack/react-query";
import { fetchAttendanceInformation } from "../../api/apiRequests";
import { AttendanceList } from "../../types/types";

export const useAttendanceList = (eventId: number) => {
  return useQuery<AttendanceList[], Error>({
    queryKey: ["attendanceList", eventId],
    queryFn: () => fetchAttendanceInformation(eventId),
  });
};
