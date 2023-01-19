import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://localhost:8800/api/",
    // sending access token to backend server
    withCredentials: true,
});

