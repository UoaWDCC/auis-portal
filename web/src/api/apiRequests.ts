import axios, { AxiosResponse } from "axios";
import {
  AnswerList,
  AttendanceList,
  EventOrMembershipReturn,
  MembershipExpiryDate as MembershipExpiryDate,
  stripeSessionStatus,
  UpdateUserInfoOrNewUser,
} from "../types/types";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Replace with your API URL
  withCredentials: true,
});

// Get user metadata
export const getUserMetaData = async (): Promise<AxiosResponse> => {
  const response = await apiClient.get("/api/user/get-metadata", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("getUserMetatdat");
  console.log(response.data);
  return response;
};

// Update user info
export const updateUserInfo = async (
  name: string,
  universityId: string,
  upi: string,
  yearOfStudy: string,
  fieldOfStudy: string,
  isDomestic: string,
  institution: string
): Promise<AxiosResponse> => {
  // console.log(data)
  const data = {
    name,
    universityId,
    upi,
    yearOfStudy,
    fieldOfStudy,
    isDomestic,
    institution,
  };

  const response = await apiClient.post("/api/user/update-user-info", data, {
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });

  console.log("update user info");
  console.log(response);
  return response;
};

export const updateUserTicketInfo = async (
  ticketId: number,
  name: string,
  email: string,
  phoneNumber: string,
  answers: AnswerList[]
): Promise<UpdateUserInfoOrNewUser> => {
  const data = {
    ticketId,
    name,
    email,
    phoneNumber,
    answers,
  };
  const response = await apiClient.post("/api/user/user-ticket-info", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("update user ticket info worked");
  return response.data;
};

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
  const response = await apiClient.get("/api/event/attendance", {
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
  const response = await apiClient.patch("/api/event/attendance", {
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return response.data;
};

// Get session status
export const getSessionStatus = async (
  sessionId: string
): Promise<stripeSessionStatus> => {
  const response = await apiClient.get(
    `/api/stripe/session-status?session_id=${sessionId}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  console.log("get session id");
  console.log(response);

  return response.data;
};

//Use this one to automatically create an Event or Membership checkout. Event checkout will decrement a ticket.
export const fetchEventOrMembershipCheckoutSecret = async (
  priceId: string,
  userTicketId: number
): Promise<EventOrMembershipReturn> => {
  const payload = { priceId, userTicketId };
  const response = await apiClient.post(
    "/api/stripe/create-checkout",
    payload,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("FETCH EVENT OR MEBERSHcK CHECKOUT SECRETYE");
  return response.data;
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
