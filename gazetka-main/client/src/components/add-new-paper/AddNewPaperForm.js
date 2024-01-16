import React from 'react'
import { Form, Button, Input, Upload, DatePicker } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 24
  }
}
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

export const AddNewPaperForm = ({ closeModal, addPaper }) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const onFinish = (values) => {
    closeModal()
    addPaper({
      ...values,
      image: 'https://picsum.photos/4096/2160',
      date: values.date.toDate()
    })
    form.resetFields()
  }
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label={t('name_paper')}
        rules={[{ required: true, type: 'string', min: 5, max: 99 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label={t('description_paper')}
        rules={[{ required: true, type: 'string', min: 5, max: 99 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="publisher"
        label={t('publisher_paper')}
        rules={[{ required: true, type: 'string', min: 5, max: 99 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="group"
        label={t('group_paper')}
        rules={[{ required: true, type: 'string', min: 5, max: 99 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label={t('image_paper')}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        rules={[{ required: true, type: 'object', message: <>{t('select_date')}</> }]}
        name="date"
        label={t('date_paper')}
      >
        <DatePicker
          style={{
            width: '100%'
          }}
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {({ getFieldsValue }) => {
          const { name, publisher, description, group, date } = getFieldsValue()
          const formIsComplete = !!name && !!publisher && !!description && !!group && !!date
          return (
            <Button block type="primary" htmlType="submit" disabled={!formIsComplete}>
              {t('create_paper')}
            </Button>
          )
        }}
      </Form.Item>
    </Form>
  )
}
AddNewPaperForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  addPaper: PropTypes.func.isRequired
}
