import React from 'react'
import { Col, Row, Image, Typography } from 'antd'
import PropTypes from 'prop-types'

const { Paragraph } = Typography

export const Paper = ({ name, description, publisher, group, image, date, extra }) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col span={10}>
        <Row>
          <Typography.Title>{name}</Typography.Title>
        </Row>
        <Row>
          <Typography.Paragraph>{description}</Typography.Paragraph>
        </Row>
        <Row>
          <h1>{publisher}</h1>
        </Row>
        <Row>
          <h2>{group}</h2>
        </Row>
        <Row>
          <Paragraph>{date.toLocaleDateString('en-US', options)}</Paragraph>
        </Row>
      </Col>
      <Col span={10}>
        <Row>
          <Image src={image} />
        </Row>
      </Col>
      <Col style={{ marginTop: 30 }} span={20}>
        <Row>
          <Paragraph>{extra}</Paragraph>
        </Row>
      </Col>
    </Row>
  )
}
Paper.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  extra: PropTypes.string
}
