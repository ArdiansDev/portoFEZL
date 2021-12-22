import { queryClient } from 'pages/_app'
import { useMutation } from 'react-query'
import { client } from "utils/client"

const submitPermission = async (data = {}) => {
  return client('/configs', { method: "PUT", data }).then(data => {
      return data
  })
}

const usePermission = () => {
  return useMutation(updates => submitPermission(updates), {
    onMutate: async newPermission => {
     queryClient.setQueryData('locale', old => ({...old, configs: {...old.configs, ...newPermission}}))
     return { newPermission }
   },
  })
}

export { usePermission } 

