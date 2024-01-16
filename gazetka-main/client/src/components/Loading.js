import React from 'react'
import { Row, Spin } from 'antd'

export const Loading = () => (
  <Row justify="center">
    <Spin size="large" tip="Loading..." />
  </Row>
)
