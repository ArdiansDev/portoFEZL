import { useQuery } from 'react-query'
import { client } from 'utils/client'

const fetchProfile = async ({query = {}}) => {
  return client(`/profile`, { params: query })
}

const useProfile = ({query}) => {
  return useQuery('profile', () => fetchProfile({query}))
}

export { useProfile, fetchProfile }
