import { message } from 'antd'
import i18next from 'i18next'
import { useMutation } from 'react-query'

import { login, signUp } from '../api'

export const useAuth = ({ onLoginSuccess, onSignUpSuccess }) => {
  const loginQuery = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (data) => {
      onLoginSuccess(data)
    },
    onError: (error) => {
      message.error(error.response.data)
    }
  })

  const signUpQuery = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: () => {
      onSignUpSuccess()
      message.success(i18next.t('success_sign_up'))
    },
    onError: (error) => {
      message.error(error.response.data)
    }
  })
  return {
    login: loginQuery.mutate,
    signUp: signUpQuery.mutate
  }
}
