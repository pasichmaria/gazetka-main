import { React, useState } from 'react'
import { Button, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { AddNewPaperForm } from './AddNewPaperForm'

export const AddNewPaperButton = ({ addPaper }) => {
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
      <Button
        type="primary"
        style={{ textAlign: 'center' }}
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        {t('new_paper')}
      </Button>
      <Modal
        style={{ textAlign: 'center' }}
        title={t('create_new_paper')}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddNewPaperForm closeModal={handleCancel} addPaper={addPaper} />
      </Modal>
    </>
  )
}
AddNewPaperButton.propTypes = {
  addPaper: PropTypes.func.isRequired
}
