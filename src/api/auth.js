import { errorToast } from "../shared/toastifier/toastify";
import axiosInstance from "../shared/utils/AxiosInstance";

export const signInApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/login", data);
  } catch (error) {
    throw error;
  }
};

export const verifyEmailApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/check/email", data);
  } catch (error) {
    throw error;
  }
};

export const verifyTwoStepMailApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/verify/mail", data);
  } catch (error) {
    throw error;
  }
};

export const verifyTwoStepPhoneApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/verify/otp/phone", data);
  } catch (error) {
    throw error;
  }
};

export const resetPasswordApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/reset-password", data);
  } catch (error) {
    throw error;
  }
};

export const getResetLinkApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/check-reset-link", data);
  } catch (error) {
    throw error;
  }
};

export const setUpdatePasswordApi = async (data) => {
  try {
    var newData = {
      confirm_password: data.confirm_password,
      password: data.password,
      reset_code: data.reset_code,
    };
    return await axiosInstance.put("/auth/password", newData);
  } catch (error) {
    throw error;
  }
};

export const setUpdatePasswordAuthApi = async (data) => {
  try {
    return await axiosInstance.put("/auth/user/password", data);
  } catch (error) {
    throw error;
  }
};

export const sendOTPCodePhoneApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/send/otp/phone", data);
  } catch (error) {
    throw error;
  }
};

export const sendOTPCodeMailApi = async (data) => {
  try {
    return await axiosInstance.post("/auth/send/otp/mail", data);
  } catch (error) {
    throw error;
  }
};

export const sendTOSAgreementApi = async (data) => {
  try {
    return await axiosInstance.post("/tos/accept", data);
  } catch (error) {
    throw error;
  }
};


