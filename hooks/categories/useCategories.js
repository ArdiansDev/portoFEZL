import { useQuery } from 'react-query'
import { client } from 'utils/client'

const fetchCategories = async ({query = {}}) => {
  return client(`/categories`, { params: query }).then(data => data?.data)
}

const useCategories = ({query, options}) => {
  return useQuery('categories', () => fetchCategories({query}), {
      ...options
  })
}

export { useCategories, fetchCategories }
