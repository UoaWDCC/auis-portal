import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/apiRequests";
import { membershipExpiryDate } from "../../types/types";

export const useUserMembership = () => {
  return useQuery<membershipExpiryDate, Error>({
    queryKey: ["membershipExpiry"],
    queryFn: fetchUser,
  });
};
