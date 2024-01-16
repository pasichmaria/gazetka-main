import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Typography } from 'antd'

const { Meta } = Card

export const PaperCard = ({ id, name, description, publisher, group, image, date }) => {
  const navigation = useNavigate()
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return (
    <Card
      hoverable="true"
      onClick={() => navigation('/papers/' + id)}
      cover={<img alt="example" src={image} />}
    >
      <Meta title={name} description={description} />
      <Typography.Paragraph>{publisher}</Typography.Paragraph>
      <Typography.Paragraph>{group}</Typography.Paragraph>
      <Typography.Paragraph>{date.toLocaleDateString('en-US', options)}</Typography.Paragraph>
    </Card>
  )
}
PaperCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  extra: PropTypes.string
}
