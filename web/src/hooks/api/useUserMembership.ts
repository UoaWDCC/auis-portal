import { useQuery } from "@tanstack/react-query";
import { fetchUserMembershipExpiry } from "../../api/apiRequests";
import { membershipExpiryDate } from "../../types/types";

export const useUserMembershipExpiry = () => {
  return useQuery<membershipExpiryDate, Error>({
    queryKey: ["membershipExpiry"],
    queryFn: fetchUserMembershipExpiry,
  });
};
