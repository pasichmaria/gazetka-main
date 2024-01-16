import { axios } from './axios'

export async function getUser() {
  const response = await axios.get(`/users/me`)
  return response.data
}
