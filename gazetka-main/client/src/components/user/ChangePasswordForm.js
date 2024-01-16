import React from 'react'
import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import PropTypes from 'prop-types'

export const ChangePasswordForm = ({ changePassword, setIsModalVisible }) => {
  const layout = {
    labelCol: {
      span: 10
    },
    wrapperCol: {
      span: 24
    }
  }

  const [form] = Form.useForm()
  const { t } = useTranslation()

  const onFinish = (data) => {
    changePassword(data)
    handleCancel()
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
        dependencies={['password']}
        name="newPassword"
        label={t('new_password_user')}
        rules={[
          {
            required: true,
            type: 'string',
            min: 6,
            max: 99,
            message: i18next.t('please_input_password')
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') !== value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(i18next.t('password_dont_confirm')))
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmNewPassword"
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
              if (!value || getFieldValue('newPassword') === value) {
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
          const { password, newPassword, confirmNewPassword } = getFieldsValue()
          const formIsComplete = !!password && !!newPassword && !!confirmNewPassword
          return (
            <Button block type="primary" htmlType="submit" disabled={!formIsComplete}>
              {t('change_password')}
            </Button>
          )
        }}
      </Form.Item>
    </Form>
  )
}

ChangePasswordForm.propTypes = {
  setIsModalVisible: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  changePassword: PropTypes.func.isRequired
}
