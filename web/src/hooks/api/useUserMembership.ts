import { useQuery } from "@tanstack/react-query";
import { fetchUserMembershipExpiry } from "../../api/apiRequests";
import { MembershipExpiryDate } from "../../types/types";

export const useUserMembershipExpiry = () => {
  return useQuery<MembershipExpiryDate, Error>({
    queryKey: ["membershipExpiry"],
    queryFn: () => fetchUserMembershipExpiry(),
  });
};
