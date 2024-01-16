import { axios } from './axios'
export async function login({ username, password }) {
  const response = await axios.post(`/auth/login`, {
    username,
    password
  })
  return response.data
}
export async function signUp({ username, password }) {
  const response = await axios.post(`/auth/sign-up`, {
    username,
    password
  })
  return response.data
}
export async function changePassword({ password, newPassword }) {
  const response = await axios.post('/auth/change-password', { password, newPassword })
  return response
}
