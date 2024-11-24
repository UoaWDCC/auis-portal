import axios from "axios";
import { User } from "../types/backend-types";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // Replace with your API URL
});

// Define a function to fetch data
export const fetchUser = async (): Promise<User> => {
  const response = await apiClient.get("/user"); // Adjust endpoint as needed
  return response.data;
};
