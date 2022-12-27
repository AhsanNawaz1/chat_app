import { HTTP_Request } from "../utils/config";
import { BASE_URL } from "../utils/constants";
import { Endpoints } from "./endpoints";
import axios from "axios";

const SignUpServices = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return axios.post(BASE_URL + Endpoints.register, formBody);
};

const loginServices = (obj) => {
  return axios.post(BASE_URL + Endpoints.login, obj);
}

const otpServices = (obj) => {
  return axios.post(BASE_URL + Endpoints.otp, obj);
}



export { SignUpServices, loginServices, otpServices };
