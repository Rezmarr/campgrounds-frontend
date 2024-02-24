import axios from "axios";

const token = localStorage.getItem("token");

export const makeRequest = axios.create({
    baseURL: "http://kr6nmcwc-8080.brs.devtunnels.ms/api",
    withCredentials: true
});

makeRequest.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const makeRequestPublic = axios.create({
    baseURL: "http://kr6nmcwc-8080.brs.devtunnels.ms/api",
    // withCredentials: true
});
