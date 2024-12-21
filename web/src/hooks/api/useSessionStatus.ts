import { useQuery } from "@tanstack/react-query";
import { getSessionStatus } from "../../api/apiRequests";
import { stripeSessionStatus } from "../../types/types";

export const useSessionStatus = (sessionId : string) => {
  return useQuery<stripeSessionStatus, Error>({
    queryKey: ["attendanceList"],
    queryFn: () => getSessionStatus(sessionId),
  });
};
