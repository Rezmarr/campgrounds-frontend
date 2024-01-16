import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://campground-api20240116001806.azurewebsites.net/api",
    withCredentials: true
});

export const makeRequestPublic = axios.create({
    baseURL: "https://campground-api20240116001806.azurewebsites.net/api",
    // withCredentials: true
});