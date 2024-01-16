import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Affix, Button, Space, Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { Paper, UpdatePaperButton, DeletePaper, Loading } from '../components'
import { usePaper } from '../hooks'

export const PaperPage = ({ user }) => {
  const navigation = useNavigate()
  const { t } = useTranslation()
  const params = useParams()
  const { paper, isLoading, deletePaper, updatePaper } = usePaper(params.id)
  return isLoading ? (
    <Loading />
  ) : paper ? (
    <>
      <Affix offsetTop={100}>
        <Space>
          <Button onClick={() => navigation('/')}>{t('back_button')}</Button>
          {user && user.id === paper.userId && (
            <UpdatePaperButton updatePaper={(props) => updatePaper(props)} paper={paper} />
          )}
          {user && user.id === paper.userId && <DeletePaper deletePaper={() => deletePaper()} />}
        </Space>
      </Affix>
      <Paper {...paper} />
    </>
  ) : (
    <Empty />
  )
}
PaperPage.propTypes = {
  user: PropTypes.object
}
