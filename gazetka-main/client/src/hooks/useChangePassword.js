import { message } from 'antd'
import { useMutation } from 'react-query'
import { queryClient } from '..'
import { changePassword } from '../api'

export const useChangePassword = () => {
  const changePasswordQuery = useMutation({
    mutationFn: (data) => changePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['password']
      })
      message.success('Confirm change')
    },
    onError: (error) => {
      message.error(error.response.data)
    }
  })
  return { changePassword: changePasswordQuery.mutate }
}
