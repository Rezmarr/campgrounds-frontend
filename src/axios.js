import axios from "axios";

// const token = localStorage.getItem("token");

export const makeRequest = axios.create({
    baseURL: "https://x4nk3hhp-5000.brs.devtunnels.ms/api",
    withCredentials: true
});

// makeRequest.interceptors.request.use((config) => {
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export const makeRequestPublic = axios.create({
    baseURL: "https://x4nk3hhp-5000.brs.devtunnels.ms/api",
    // withCredentials: true
});
