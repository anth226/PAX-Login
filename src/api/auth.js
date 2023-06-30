import { errorToast } from "../shared/toastifier/toastify";
import axiosInstance from "../shared/utils/AxiosInstance";

export const signInApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/login", data);
  } catch (error) {
    throw error
  }
};

export const verifyEmailApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/check/email", data);
  } catch (error) {
    throw error
  }
};

export const verifyTwoStepApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/verify/mail", data);
  } catch (error) {
    throw error
  }
};

export const resetPasswordApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/reset-password", data);
  } catch (error) {
    throw error
  }
};

export const getResetLinkApi = async (
  code,
  setIsUpdatePassword,
  isUpdatePassword
) => {
  setIsUpdatePassword(true);
  try {
    return await axiosInstance.post("/auth/change-reset-link", code);
  } catch (error) {
    setIsUpdatePassword(false);
    throw error
  }
};

export const setUpdatePasswordApi = async (data) => {
  try {
    return await axiosInstance.put("/auth/password", data);
  } catch (error) {
    throw error
  }
};

export const sendOTPCodePhoneApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/send/otp/phone", data);
  } catch (error) {
    throw error
  }
};

export const sendOTPCodeMailApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/send/otp/mail", data);
  } catch (error) {
    throw error
  }
};
