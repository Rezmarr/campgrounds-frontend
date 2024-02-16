import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://b19hrc3l-7205.brs.devtunnels.ms/api",
    withCredentials: true
});

export const makeRequestPublic = axios.create({
    baseURL: "https://b19hrc3l-7205.brs.devtunnels.ms/api",
    // withCredentials: true
});
