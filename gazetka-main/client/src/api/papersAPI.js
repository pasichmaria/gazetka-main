import qs from 'qs'
import { axios } from './axios'

export async function getListPapers(args) {
  const response = await axios.get(`/papers/?${qs.stringify(args)}`)
  return {
    count: response.headers.get('Documents-Count'),
    data: response.data.map((a) => ({ ...a, date: new Date(a.date) }))
  }
}

export async function getPaper({ id }) {
  const response = await axios.get(`/papers/${id}`)
  return { ...response.data, date: new Date(response.data.date) }
}

export async function getGroups() {
  const response = await axios.get(`/papers/groups`)
  return response.data
}

export async function getPublishers() {
  const response = await axios.get(`/papers/publishers`)
  return response.data
}

export async function updatePaper({ id, name, publisher, group, description, extra, date, image }) {
  const response = await axios.put(`/papers/${id}`, {
    id,
    name,
    publisher,
    group,
    description,
    extra,
    date,
    image
  })
  return response.data
}

export async function addPaper({ name, publisher, group, description, extra, date, image }) {
  const response = await axios.post(`/papers`, {
    name,
    publisher,
    group,
    description,
    extra,
    date,
    image
  })
  return response.data
}

export async function deletePaper({ id }) {
  const response = await axios.delete(`/papers/${id}`)
  return response.data
}
