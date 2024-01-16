import { React } from 'react'
import { Col, Pagination, Row, Space, Input, Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  FilterButton,
  Loading,
  PaperCardsGrid,
  ResetButton,
  AddNewPaperButton
} from '../components'
import { usePapers } from '../hooks'

const { Search } = Input
export const PapersPage = ({ user }) => {
  const {
    papersQuery,
    page,
    setPage,
    setSearchValue,
    setPublisher,
    setGroup,
    setDateFrom,
    setDateTo,
    perPage,
    userIdParamEnabled,
    setUserIdParamEnabled,
    groups,
    publishers,
    addPaper
  } = usePapers(user)
  const { t } = useTranslation()
  return (
    <>
      {papersQuery.isLoading ? (
        <Loading />
      ) : (
        <>
          <Row gutter={[0, 16]} justify="space-between" style={{ marginBottom: '16px' }}>
            <Col xs={12}>
              <Space direction="horizontal" style={{ size: 'large' }}>
                <Search
                  onSearch={(value) => {
                    setSearchValue(value)
                    setPage(0)
                  }}
                  size={'middle'}
                />
                <ResetButton
                  onClick={() => {
                    setSearchValue()
                    setDateTo()
                    setDateFrom()
                    setGroup()
                    setPublisher()
                    setPage(0)
                  }}
                />
                <FilterButton
                  publishers={publishers}
                  groups={groups}
                  setPage={setPage}
                  setGroup={setGroup}
                  setPublisher={setPublisher}
                  setDateTo={setDateTo}
                  setDateFrom={setDateFrom}
                />
                <>
                  {user && (
                    <Checkbox
                      checked={userIdParamEnabled}
                      onChange={(e) => setUserIdParamEnabled(e.target.checked)}
                    >
                      {t('my_papers')}
                    </Checkbox>
                  )}
                </>
              </Space>
            </Col>
            <Col xs={12}>
              <Row justify="end" direction="horizontal" style={{ size: 'large' }}>
                <Col>{user && <AddNewPaperButton addPaper={(props) => addPaper(props)} />}</Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Row justify="center" direction="horizontal" style={{ size: 'large' }}>
                <Col>
                  <Pagination
                    onChange={(pageNumber) => setPage(pageNumber - 1)}
                    current={page + 1}
                    defaultPageSize={perPage}
                    total={papersQuery.data.count}
                    showSizeChanger={false}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <PaperCardsGrid papers={papersQuery.data.data} />
          <Row justify="center" direction="horizontal" style={{ size: 'large', marginTop: '16px' }}>
            <Col>
              <Pagination
                onChange={(pageNumber) => setPage(pageNumber - 1)}
                current={page + 1}
                defaultPageSize={perPage}
                total={papersQuery.data.count}
                showSizeChanger={false}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
PapersPage.propTypes = {
  user: PropTypes.object
}
