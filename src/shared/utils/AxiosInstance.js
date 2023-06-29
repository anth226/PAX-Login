import axios from "axios";
import 'dotenv/config'

// export const baseURL = "http://192.168.1.73:8000";
export const baseURL = process.env.NEXT_PUBLIC_API_URL;


const axiosInstance = axios.create({
  baseURL: baseURL,
});
export default axiosInstance;
