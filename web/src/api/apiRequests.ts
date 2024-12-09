import axios from "axios";
import {
  AttendanceList,
  MembershipExpiryDate as MembershipExpiryDate,
} from "../types/types";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Replace with your API URL
});

// User membership expiry
export const fetchUserMembershipExpiry =
  async (): Promise<MembershipExpiryDate> => {
    const response = await apiClient.get("/api/user/get-membership-expiry");
    return response.data;
  };

// Admin to see attendance information
export const fetchAttendanceInformation = async (
  eventId: number
): Promise<AttendanceList[]> => {
  const params = { eventId: eventId };
  const response = await axios.get("/api/event/attendance", {
    params: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.eventTickets;
};

// Admin to update attendance information
export const postAttendanceUpdate = async (
  peopleTicketId: number,
  attendance: boolean
): Promise<{ name: string }> => {
  const data = {
    peopleTicketId: peopleTicketId,
    attendance: attendance,
  };
  const response = await axios.patch("/api/event/attendance", {
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return response.data;
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

// TODO: Delete these? ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

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
