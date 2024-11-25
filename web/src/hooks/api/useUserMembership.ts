import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/apiRequests";
import { User } from "../../types/backend-types";

export const useUserMembership = () => {
    return useQuery<User[], Error>({
        queryKey: ['user'],
        queryFn: fetchUser,
      })
  };