import { message } from 'antd'
import React from 'react'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '../'
import { addPaper, getGroups, getPublishers, getListPapers } from '../api'

export const usePapers = (user) => {
  const addPapersQuery = useMutation({
    mutationFn: (data) => addPaper(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['papers']
      })
      message.success('Created')
    },
    onError: (error) => {
      message.error(error.response.data)
    }
  })

  const getGroupsQuery = useQuery(['groups'], () => getGroups(), { initialData: [] })
  const getPublishersQuery = useQuery(['publishers'], () => getPublishers(), { initialData: [] })
  const [publisher, setPublisher] = React.useState()
  const [group, setGroup] = React.useState()
  const [searchValue, setSearchValue] = React.useState()
  const [page, setPage] = React.useState(0)
  const [dateTo, setDateTo] = React.useState()
  const [dateFrom, setDateFrom] = React.useState()
  const [userIdParamEnabled, setUserIdParamEnabled] = React.useState(false)
  const perPage = 12
  const papersQuery = useQuery(
    [
      'papers',
      {
        publisher,
        page,
        group,
        searchValue,
        dateTo,
        dateFrom,
        userIdParamEnabled,
        userId: userIdParamEnabled ? (user ? user.id : undefined) : undefined
      }
    ],
    () =>
      getListPapers({
        publisher,
        page,
        group,
        searchValue,
        perPage,
        dateTo,
        dateFrom,
        userId: userIdParamEnabled ? (user ? user.id : undefined) : undefined
      }),
    {
      onError: (error) => {
        message.error(error.response.data)
      },
      keepPreviousData: true
    }
  )
  return {
    perPage,
    publisher,
    setPublisher,
    page,
    setPage,
    group,
    setGroup,
    searchValue,
    setSearchValue,
    papersQuery,
    dateTo,
    setDateTo,
    dateFrom,
    setDateFrom,
    userIdParamEnabled,
    setUserIdParamEnabled,
    groups: getGroupsQuery.data,
    publishers: getPublishersQuery.data,
    addPaper: addPapersQuery.mutate
  }
}
