import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
// indicates whether or not cross-site Access-Control requests
// should be made using credentials such as cookies
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
