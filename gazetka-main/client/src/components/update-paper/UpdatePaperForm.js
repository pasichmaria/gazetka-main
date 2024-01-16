import React from 'react'
import { Button, Form, Input, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export const UpdatePaperForm = ({ paper, closeModal, updatePaper }) => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    updatePaper({ ...values, date: values.date.toDate(), id: paper.id })
    closeModal()
  }
  const { t } = useTranslation()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  const formItemLayout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 24
    }
  }

  return (
    <Form {...formItemLayout} form={form} name="Edit" onFinish={onFinish}>
      <Form.Item
        initialValue={paper.name}
        name="name"
        label={t('name_paper')}
        rules={[
          {
            required: true,
            message: <>{t('input_name')}</>
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={paper.description}
        name="description"
        label={t('description_paper')}
        rules={[
          {
            required: true,
            message: <>{t('input_description')}</>
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={paper.publisher}
        name="publisher"
        label={t('publisher_paper')}
        rules={[
          {
            required: true,
            message: <>{t('choose_date')}</>
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item initialValue={paper.group} name="group" label={t('group_paper')}>
        <Input />
      </Form.Item>
      <Form.Item initialValue={paper.extra} name="extra" label={t('extra_paper')}>
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={dayjs(paper.date, options)}
        rules={[{ required: true, type: 'object', message: <>{t('choose_date')}</> }]}
        name="date"
        label={t('date_paper')}
      >
        <DatePicker
          style={{
            width: '100%'
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button block htmlType="submit">
          {t('update_paper_button')}
        </Button>
      </Form.Item>
    </Form>
  )
}
UpdatePaperForm.propTypes = {
  updatePaper: PropTypes.func.isRequired,
  paper: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}
