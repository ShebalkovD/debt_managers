import type { AxiosRequestConfig } from "axios"
import { axiosApi } from "./axiosApi"

export function createRequest<T>(options: AxiosRequestConfig): Promise<T>{
  const response = axiosApi({...options})
    .then((res) => res.data)
    .catch((err) => {throw new Error(err.message)})

  return response
}