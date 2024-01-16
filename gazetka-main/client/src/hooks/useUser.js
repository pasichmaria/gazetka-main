import { message } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../api'

export const useUser = () => {
  const [user, setUser] = useState()
  const userQuery = useQuery(['user'], () => getUser(), {
    onError: (error) => {
      message.error(error.response.data)
    },
    onSuccess: (data) => {
      setUser(data)
    },
    enabled: !!localStorage.getItem('token')
  })
  return { getUser: userQuery.refetch, setUser, user }
}
