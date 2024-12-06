import axios from "axios";
import { membershipExpiryDate as MembershipExpiryDate } from "../types/types";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Replace with your API URL
});

// Define a function to user membership expiry
export const fetchUserMembershipExpiry =
  async (): Promise<MembershipExpiryDate> => {
    const response = await apiClient.get("/api/user/get-membership-expiry");
    return response.data;
  };

// fetch user attendance information
// try {
//   const response = await axios.get("/api/event/attendance", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (response.status === 200) {
//     // Form Submission Successful
//     console.log(response)
//   } else {
//     console.log(response)
//   }
// } catch (error) {
//     console.log("error")
// }
export const fetchAttendanceInformation = async (payload: {
  eventId: number;
}): Promise<string> => {
  return await fetch("/api/stripe/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // add our own priceId here later for different products
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};


//Use this one to automatically create an Event or Membership checkout. Event checkout will decrement a ticket.
export const fetchEventOrMembershipCheckoutSecret = async (payload: {
  priceId: string;
  userTicketId: number;
}): Promise<string> => {
  return await fetch("/api/stripe/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // add our own priceId here later for different products
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};

// the ones below are for a separate approach. Safe to use.
export const fetchEventCheckoutSecret = async (payload: {
  stripeKey: string;
}): Promise<string> => {
  return await fetch("/api/stripe/create-event-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // add our own priceId here later for different products
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};

export const fetchMembershipCheckoutSecret = async (payload: {
  stripeKey: string;
}): Promise<string> => {
  return await fetch("/api/stripe/create-membership-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // add our own priceId here later for different products
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};
