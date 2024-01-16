import React from 'react'
import { Layout, Space, Button, Typography } from 'antd'
import { InstagramOutlined, GithubOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { TelegramIcon } from './icons'

export function Footer() {
  const { Title } = Typography
  const { t } = useTranslation()
  return (
    <>
      <Layout.Footer
        style={{
          backgroundColor: '#262626',
          color: 'white',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Space
          direction="vertical"
          size={'small'}
          style={{
            textAlign: 'center',
            justifyContent: 'space-around',
            width: '100%'
          }}
        >
          <Title level={2} style={{ justifyContent: 'center', color: 'white' }}>
            {t('contacts')}
          </Title>
          <Button type="link" href="https://github.com/pasichmaria" icon={<GithubOutlined />}>
            GitHub
          </Button>
          <Button
            type="link"
            href="https://instagram.com/blueberrypms"
            icon={<InstagramOutlined />}
          >
            Instagram
          </Button>
          <Button type="link" href="https://t.me/Blueberrypms" icon={<TelegramIcon />}>
            Telegram
          </Button>
          <Title level={5} style={{ color: 'white' }}>
            © 2023 Copyright: Gazetka
          </Title>
        </Space>
      </Layout.Footer>
    </>
  )
}
