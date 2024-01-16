import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { AuthForm } from './AuthForm'

export const AuthButton = ({ getUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { t } = useTranslation()
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button type="primary" shape="rectangle" icon={<LoginOutlined />} onClick={showModal}>
        {t('login_button')}
      </Button>
      <Modal
        style={{ textAlign: 'center' }}
        title={t('login_button_form')}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AuthForm getUser={getUser} closeModal={handleCancel} />
      </Modal>
    </>
  )
}
AuthButton.propTypes = {
  userId: PropTypes.string,
  getUser: PropTypes.func.isRequired
}
