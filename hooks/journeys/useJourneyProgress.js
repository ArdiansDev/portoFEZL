import { useQuery } from 'react-query'
import { client } from 'utils/client'

const fetchJourneyProgress = async ({query = {}, id}) => {
  return client(`/journeys/${id}/progress`, { params: query }).then(data => data?.data)
}

const useJourneyProgress = ({query, id}) => {
  return useQuery(['journey-progress',id], () => fetchJourneyProgress({query, id}))
}

export { useJourneyProgress, fetchJourneyProgress }
