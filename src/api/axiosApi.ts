import axios from "axios"

export const axiosApi = axios.create({
    baseURL: '/api/v1',
    timeout: 1000,
})