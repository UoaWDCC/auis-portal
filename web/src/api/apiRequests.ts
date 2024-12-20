import axios, { AxiosResponse } from "axios";
import {
  AttendanceList,
  MembershipExpiryDate as MembershipExpiryDate,
} from "../types/types";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Replace with your API URL
  withCredentials: true,
});

// Get user metadata
export const getUserMetadaData = async (): Promise<AxiosResponse> => {
  const response = await apiClient.get("/api/user/get-metadata", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

// Update user info
export const updateUserInfo = async (data: object): Promise<AxiosResponse> => {
  const response = await apiClient.post("/api/user/update-user-info", data, {
    headers: {
      "Content-Type": "application/json",
    },
    data: { data },
  });
  return response;
};

export const updateUserTicketInfo = async (
  data: object
): Promise<AxiosResponse> => {
  const response = await apiClient.post("/api/user/user-ticket-info", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
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
): Promise<AxiosResponse> => {
  const response = await apiClient.get(
    `/api/stripe/session-status?session_id=${sessionId}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
};

//Use this one to automatically create an Event or Membership checkout. Event checkout will decrement a ticket.
export const fetchEventOrMembershipCheckoutSecret = async (payload: {
  priceId: string;
  userTicketId: number;
}): Promise<string> => {
  const response = await apiClient.post(
    "/api/stripe/create-checkout",
    payload,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data.clientSecret;
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
