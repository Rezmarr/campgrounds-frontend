import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://campground-api-final.azurewebsites.net/api",
    withCredentials: true
});

export const makeRequestPublic = axios.create({
    baseURL: "https://campground-api-final.azurewebsites.net/api",
    // withCredentials: true
});
