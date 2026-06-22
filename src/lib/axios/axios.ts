import axios from "axios";
import {SERVER_CONFIG} from "@/config/server.config.ts";

export const api = axios.create({
    baseURL: SERVER_CONFIG.SERVER.VITE_SERVER_URL,
    withCredentials: true,
})