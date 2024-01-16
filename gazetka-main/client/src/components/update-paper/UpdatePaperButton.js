import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { UpdatePaperForm } from './UpdatePaperForm'

export const UpdatePaperButton = ({ paper, updatePaper }) => {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {t('update_paper_button')}
      </Button>
      <Modal
        style={{ textAlign: 'center' }}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        title={t('update_paper')}
      >
        <UpdatePaperForm updatePaper={updatePaper} closeModal={handleCancel} paper={paper} />
      </Modal>
    </>
  )
}
UpdatePaperButton.propTypes = {
  updatePaper: PropTypes.func.isRequired,
  paper: PropTypes.object.isRequired
}
