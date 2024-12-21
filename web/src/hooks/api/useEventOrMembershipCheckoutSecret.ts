import { useMutation } from "@tanstack/react-query";
import { fetchEventOrMembershipCheckoutSecret } from "../../api/apiRequests";
import { EventOrMembershipReturn } from "../../types/types";

export const useEventOrMembershipCheckoutSecret = () => {
  return useMutation<
    EventOrMembershipReturn,
    Error,
    { priceId: string; userTicketId: number }
  >({
    mutationFn: ({ priceId, userTicketId }) =>
      fetchEventOrMembershipCheckoutSecret(priceId, userTicketId),
  });
};
