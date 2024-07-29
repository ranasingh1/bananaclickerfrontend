import io from "socket.io-client";
import { BASE_URL } from "./constant";

const socket = io(BASE_URL);

export default socket;
