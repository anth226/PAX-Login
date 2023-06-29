import { errorToast } from "../shared/toastifier/toastify";
import axiosInstance from "../shared/utils/AxiosInstance";

export const signInApi = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    throw error
  }
};

export const verifyEmailApi = async (data) => {
  try {
        console.log(process.env.API_URL)

    const response = await axiosInstance.post("/auth/check/email", data);
    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    throw error
  }
};

export const verifyTwoStepApi = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/verify/mail", data);
  } catch (error) {
    throw error
  }
};

export const resetPasswordApi = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/reset-password", data);
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
    const response = await axiosInstance.post("/auth/change-reset-link", code);
    return {
      status: "success",
      res: response,
    };
  } catch (error) {
    setIsUpdatePassword(false);
    throw error
  }
};

export const setUpdatePasswordApi = async (data) => {
  try {
    const response = await axiosInstance.put("/auth/password", data);
  } catch (error) {
    throw error
  }
};
