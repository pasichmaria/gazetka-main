import { useMutation, useQuery } from 'react-query'
import { message } from 'antd'

import { deletePaper, getPaper, updatePaper } from '../api'
import { queryClient } from '../'

export const usePaper = (id) => {
  const getQuery = useQuery(
    ['paper', id],
    () => getPaper({ id }),

    {
      onError: (error) => {
        message.error(error.response.data)
      },
      enabled: !!id
    }
  )

  const updateQuery = useMutation({
    mutationFn: (data) => updatePaper(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paper', id] })
      message.success('Updated')
    },
    onError: (error) => {
      message.error(error.response.data)
    }
  })

  const deleteQuery = useMutation({
    mutationFn: () => deletePaper({ id }),
    onSuccess: () => {
      message.success('Deleted')
    },
    onError: (error) => {
      message.error(error.response.data)
    }
  })

  return {
    paper: getQuery.data,
    isLoading: getQuery.isLoading,
    deletePaper: deleteQuery.mutate,
    updatePaper: updateQuery.mutate
  }
}
