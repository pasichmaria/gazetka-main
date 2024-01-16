import { Button, Form, Input, Tabs } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { UserOutlined } from '@ant-design/icons'
import i18next from 'i18next'
import { useAuth } from '../../hooks'

const layout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 24
  }
}

export const AuthForm = ({ closeModal, getUser }) => {
  const [activeKey, setActiveKey] = useState('1')
  const { t } = useTranslation()
  const [loginForm] = Form.useForm()
  const [signUpForm] = Form.useForm()
  
  const { login, signUp } = useAuth({
    onLoginSuccess: (data) => {
      localStorage.setItem('token', data)
      closeModal()
      loginForm.resetFields()
      getUser(data)
    },
    onSignUpSuccess: () => {
      closeModal()
      signUpForm.resetFields()
      setActiveKey('1')
    }
  })

  const onFinishLogin = (data) => {
    login(data)
  }
  const onFinishSignUp = (data) => {
    signUp(data)
  }
  return (
    <Tabs
      onChange={(value) => {
        setActiveKey(value)
      }}
      activeKey={activeKey}
      centered
      items={[
        {
          label: i18next.t('login_button'),
          key: '1',
          children: (
            <Form {...layout} form={loginForm} name="control-hooks" onFinish={onFinishLogin}>
              <Form.Item
                name="username"
                label={t('login_user')}
                rules={[{ required: true, type: 'string', min: 3, max: 99 }]}
              >
                <Input suffix={<UserOutlined className="site-form-item-icon" />} />
              </Form.Item>
              <Form.Item
                name="password"
                label={t('password_user')}
                rules={[
                  {
                    required: true,
                    type: 'string',
                    min: 6,
                    max: 99,
                    message: i18next.t('please_input_password')
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item shouldUpdate>
                {({ getFieldsValue }) => {
                  const { username, password } = getFieldsValue()
                  const formIsComplete = !!username && !!password
                  return (
                    <Button block type="primary" htmlType="submit" disabled={!formIsComplete}>
                      {t('login_button')}
                    </Button>
                  )
                }}
              </Form.Item>
            </Form>
          )
        },
        {
          label: i18next.t('registration'),
          key: '2',
          children: (
            <Form {...layout} form={signUpForm} name="control-hooks" onFinish={onFinishSignUp}>
              <Form.Item
                name="username"
                label={t('login_user')}
                rules={[{ required: true, type: 'string', min: 3, max: 99 }]}
              >
                <Input suffix={<UserOutlined className="site-form-item-icon" />} />
              </Form.Item>
              <Form.Item
                name="password"
                label={t('password_user')}
                rules={[
                  {
                    required: true,
                    type: 'string',
                    min: 6,
                    max: 99,
                    message: i18next.t('please_input_password')
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label={t('password_confirm')}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    type: 'string',
                    min: 6,
                    max: 99,
                    required: true,
                    message: i18next.t('please_confirm')
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error(i18next.t('password_dont_confirm')))
                    }
                  })
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item shouldUpdate>
                {({ getFieldsValue }) => {
                  const { username, password, confirmPassword } = getFieldsValue()
                  const formIsComplete = !!username && !!password && !!confirmPassword
                  return (
                    <Button block type="primary" htmlType="submit" disabled={!formIsComplete}>
                      {t('create_user')}
                    </Button>
                  )
                }}
              </Form.Item>
            </Form>
          )
        }
      ]}
    />
  )
}
AuthForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
}
