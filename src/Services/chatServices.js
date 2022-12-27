import { HTTP_Request } from "../utils/config"
import { BASE_URL } from "../utils/constants";
import { Endpoints } from "./endpoints";
import axios from "axios";


const getUserServices = () => {
  return HTTP_Request.get(BASE_URL + Endpoints.getUsers);
}

const getAllChat = (id) => {
  return HTTP_Request.get(BASE_URL + Endpoints.getConversations + id);
}

const getChat = (id) => {
  return HTTP_Request.get(BASE_URL + Endpoints.getConversation + id);
}

const createConversation = (obj) => {
  return HTTP_Request.post(BASE_URL + Endpoints.createConversation, obj);
}

const createMessageService = (obj) => {
  return HTTP_Request.post(BASE_URL + Endpoints.createMessage, obj);
}

const getConversationList = (obj) => {
  return HTTP_Request.get(BASE_URL + Endpoints.getConversationList, obj);
}


export { getUserServices, getAllChat, getChat, createConversation, createMessageService, getConversationList };
