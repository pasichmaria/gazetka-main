import React from 'react'
import { Empty, Col, Row, Space } from 'antd'
import PropTypes from 'prop-types'

import { PaperCard } from './PaperCard'

export function PaperCardsGrid({ papers }) {
  return (
    <Space
      direction="vertical"
      size={'large'}
      style={{
        width: '100%'
      }}
    >
      {papers.length > 0 ? (
        <>
          <Row gutter={{ md: 8, xl: 16, lg: 8 }}>
            {papers.map((paper, index) => (
              <Col key={index} lg={6} md={12} xl={4}>
                <PaperCard {...paper} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Empty />
      )}
    </Space>
  )
}
PaperCardsGrid.propTypes = {
  papers: PropTypes.array.isRequired
}
