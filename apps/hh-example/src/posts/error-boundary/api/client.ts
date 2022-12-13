import axios from 'axios'

import { handleAxiosError } from '../lib/error'

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
})

axiosClient.interceptors.response.use(
  (res) => res,
  (error) => handleAxiosError(error),
)
