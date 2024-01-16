import { React } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Space } from 'antd'
import PropTypes from 'prop-types'

import { LanguageSwitch } from './LanguageSwitch'
import { AuthButton } from './auth'
import { UserDropdown } from './user'

export function Header({ getUser, setUser, user }) {
  return (
    <Layout.Header
      style={{
        backgroundColor: '#1f1f1f',
        alignItems: 'center',
        width: "100%",
        display: 'flex'
      }}
    >
      <Space
        direction="horizontal"
        size={'middle'}
        style={{
          width: '100%'
        }}
      > 
      <Link to="/">
        <div className="logo" />
        </Link>
      </Space>
      <Space>
        <LanguageSwitch />
        {user ? <UserDropdown user={user} setUser={setUser} /> : <AuthButton getUser={getUser} />}
      </Space>
    </Layout.Header>
  )
}
Header.propTypes = {
  getUser: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object
}
