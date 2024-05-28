import axios from "axios";

const URL = 'https://66162e0eb8b8e32ffc7c937c.mockapi.io/api/stockproducts/Llantas'

export const axiosInstance = axios.create({
    baseURL: URL
})