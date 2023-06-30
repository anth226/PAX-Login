import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const successToast = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export const errorToast = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};

export const apiErrorToast = (error) => {
  let errorMessage = error?.response?.data?.message ?? error.message
  if(error?.response?.data?.message && Array.isArray(error?.response?.data?.message)) {
    errorMessage = error?.response?.data?.message[0]
  }
  toast.error(errorMessage, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    theme: "colored",
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
};
