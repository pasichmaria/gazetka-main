import React from 'react'
import { Button, Popconfirm } from 'antd'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

export const DeletePaper = ({ deletePaper }) => {
  const { t } = useTranslation()
  const confirm = () => {
    deletePaper()
  }
  return (
    <Popconfirm
      title={t('are_you_sure')}
      okText={t('yes')}
      cancelText={t('no')}
      onConfirm={confirm}
    >
      <Button danger>{t('delete')}</Button>
    </Popconfirm>
  )
}
DeletePaper.propTypes = {
  deletePaper: PropTypes.func.isRequired
}
