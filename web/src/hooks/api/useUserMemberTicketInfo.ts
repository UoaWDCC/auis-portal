import { useQuery } from "@tanstack/react-query";
import { fetchUserMemberTicketInfo } from "../../api/apiRequests";
import { MembershipTicketInfo } from "../../types/types";

export const useUserMemberTicketInfo = (eventId: number) => {
  return useQuery<MembershipTicketInfo, Error>({
    queryKey: ["membershipTicketInfo"],
    queryFn: () => fetchUserMemberTicketInfo(eventId),
  });
};