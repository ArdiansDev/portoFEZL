import { useQuery } from 'react-query'
import { client } from 'utils/client'

const fetchActivity = async ({query = {}, activity_id}) => {
  return client(`/activity/${activity_id}`, { params: query }).then(data => data?.data)
}

const useActivity = ({query, activity_id}) => {
  return useQuery(['activity',activity_id], () => fetchActivity({query, activity_id}))
}

export { useActivity, fetchActivity }
