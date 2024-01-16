import React from 'react'
import { ConfigProvider, Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'
import i18next from 'i18next'

import { PapersPage, PaperPage, NotFoundPage } from './pages'
import { Footer, Header } from './components'
import en_US from 'antd/es/locale/en_US'
import uk_UA from 'antd/es/locale/uk_UA'
import { useUser } from './hooks'

const { Content } = Layout

const App = () => {
  const { getUser, user, setUser } = useUser()
  return (
    <ConfigProvider locale={i18next.language === 'ua' ? uk_UA : en_US}>
      <Layout>
        <Header user={user} getUser={getUser} setUser={setUser} />
        <Content
          style={{
            padding: '25px 50px',
            width: '100%'
          }}
        >
          <Routes>
            <Route path="/" element={<PapersPage user={user} />} />
            <Route path="papers/:id" element={<PaperPage user={user} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  )
}

export default App
