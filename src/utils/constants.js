import io from "socket.io-client"
export const socket = io.connect("http://localhost:5000")

export const BASE_URL = "http://localhost:5000/";
// export const BASE_URL = "https://8af8-202-163-76-70.ngrok.io/"
