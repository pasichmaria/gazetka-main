import axioslib from 'axios'

export const axios = axioslib.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3001'
})
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  return config
})
