import axios from "axios";

// Base URL from environment variables
const baseUrl = `${process.env.REACT_APP_SERVER_URL}/auth`;

// Register user
export const Register = async (data) => {
    console.log('------------baseurl', baseUrl);
  return axios.post(`${baseUrl}/register`, data);
};

// Login user
export const Login = async (data) => {
  return axios.post(`${baseUrl}/login`, data);
};

// Forgot password
export const ForgotPassword = async (data) => {
  return axios.post(`${baseUrl}/forgot-password`, data);
};

// Verify link (e.g., from email verification or password reset)
export const VerifyLink = async (data) => {
  return axios.post(`${baseUrl}/verify-link`, data);
};
