import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Dropdown, Modal } from 'antd'
import { useTranslation } from 'react-i18next'

import i18next from 'i18next'

import { useChangePassword } from '../../hooks'
import { ChangePasswordForm } from './ChangePasswordForm'

export const UserDropdown = ({ setUser, user }) => {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleLogoutClick = () => {
    localStorage.removeItem('token'), setUser()
  }
  const { changePassword } = useChangePassword()
  const items = [
    {
      label: i18next.t('logout'),
      key: '1',
      icon: <LogoutOutlined />,
      onClick: () => handleLogoutClick()
    },
    {
      label: i18next.t('change_password'),
      key: '2',
      icon: <UserOutlined />,
      onClick: () => setIsModalVisible(true)
    }
  ]
  const menuProps = {
    items
  }
  return (
    <>
      <Dropdown.Button menu={menuProps} icon={<UserOutlined />}>
        {t('hi')},{''} {user.username}
      </Dropdown.Button>
      <Modal
        title={t('change_password')}
        style={{ textAlign: 'center' }}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ChangePasswordForm
          changePassword={(props) => changePassword(props)}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
        />
      </Modal>
    </>
  )
}
UserDropdown.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
}
