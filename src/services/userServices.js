import axios from "axios";
import { getAxiosOptions } from "../helper";

// Base URL from environment variables
const baseUrl = `${process.env.REACT_APP_SERVER_URL}/user`;

// Register user
export const UpdateProfile = async (data) => {    
  return axios.put(`${baseUrl}/update-profile`, data, getAxiosOptions());
};

// Login user
export const ChangePassword = async (data) => {
  return axios.post(`${baseUrl}/change-password`, data, getAxiosOptions());
};
