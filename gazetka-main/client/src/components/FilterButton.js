import { React, useState } from 'react'
import { Button, Col, DatePicker, Drawer, Form, Select } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

const { RangePicker } = DatePicker
const { Option } = Select

export const FilterButton = ({
  groups,
  publishers,
  setDateTo,
  setDateFrom,
  setPublisher,
  setGroup,
  setPage
}) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  const [form] = Form.useForm()
  const onFinish = ({ dateRange, publisher, group }) => {
    setPublisher(publisher)
    setGroup(group)
    setPage(0)
    if (dateRange) {
      setDateTo(dateRange[1].toDate())
      setDateFrom(dateRange[0].toDate())
    }
  }
  return (
    <>
      <Drawer
        title={t('filter_papers')}
        width={360}
        onClose={onClose}
        open={visible}
        bodyStyle={{
          paddingBottom: 80
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Col span={20}>
            <Form.Item name="publisher" label={t('publisher_paper')}>
              <Select
                filterOption={(publisher, option) => option.includes(publisher)}
                placeholder={t('choose_publisher_paper')}
              >
                {publishers.map((publisher, index) => {
                  return <Option key={index} value={publisher}></Option>
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item name="group" label={t('group_paper')}>
              <Select
                filterOption={(group, option) => option.includes(group)}
                placeholder={t('choose_group_paper')}
              >
                {groups.map((group, index) => {
                  return <Option key={index} value={group}></Option>
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item name="dateRange" label={t('date_paper')}>
              <RangePicker
                ranges={{
                  Today: [dayjs(), dayjs()],
                  'This Month': [dayjs().startOf('month'), dayjs().endOf('month')]
                }}
              />
            </Form.Item>
          </Col>
          <Form.Item>
            <Button htmlType="submit">{t('filter_paper')}</Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Button onClick={showDrawer} icon={<FilterOutlined />}>
        {t('filter')}
      </Button>
    </>
  )
}
FilterButton.propTypes = {
  publishers: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  setDateTo: PropTypes.func.isRequired,
  setDateFrom: PropTypes.func.isRequired,
  setPublisher: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
}
