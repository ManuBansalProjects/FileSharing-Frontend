import axios from "axios";
import { getAxiosOptions } from "../helper";

// Base URL from environment variables
const baseUrl = `${process.env.REACT_APP_SERVER_URL}/file`;

// Register user
export const UploadFile = async (data) => {    
  return axios.post(`${baseUrl}/upload-file`, data, getAxiosOptions());
};

// Login user
export const ListFiles = async (skip, limit, filter) => {
  return axios.post(`${baseUrl}/list-files`, {skip, limit, filter}, getAxiosOptions());
};

export const GetSingleFile = async (fileId) => {
  return axios.get(`${baseUrl}/get-single-file/${fileId}`);
};

export const GetFileComments = async (fileId) => {
  return axios.get(`${baseUrl}/get-file-comments/${fileId}`);
};

export const DeleteFile = async (fileId) => {
  return axios.delete(`${baseUrl}/delete-file/${fileId}`, getAxiosOptions());
};



export const AddComment = async (data) => {
  data = {
    ...data,
    user_id : JSON.parse(localStorage.getItem('user'))._id
  }
  return axios.post(`${baseUrl}/add-comment`, data);
};
export const ReplyComment = async (data) => {
  data = {
    ...data,
    user_id : JSON.parse(localStorage.getItem('user'))._id
  }
  return axios.post(`${baseUrl}/reply-comment`, data);
};
export const DeleteComment = async (data) => {
  return axios.post(`${baseUrl}/delete-comment`, data, getAxiosOptions());
};
export const DeleteRepliedComment = async (data) => {
  return axios.post(`${baseUrl}/delete-replied-comment`, data, getAxiosOptions());
};