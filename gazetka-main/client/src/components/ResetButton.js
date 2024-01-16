import React from 'react'
import { Button } from 'antd'
import { UndoOutlined } from '@ant-design/icons'

export const ResetButton = (props) => {
  return <Button {...props} icon={<UndoOutlined />} size={'middle'}></Button>
}
