import axios from "axios";

const http = axios.create({
    baseURL: process.env.NEXTAUTH_URL,
    headers: {
        withCredentials: true,
        'Content-Type': 'application/json'
    }
});

export default http;
