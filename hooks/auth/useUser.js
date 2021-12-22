import { useQuery } from 'react-query'
import { client } from "utils/client"

const fetchUser = async () => {
  return client(`/auth`).then((data) => {
    return data?.data
  });
}

export default function useUser(config) {
  
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let authToken = urlParams.get('auth_token')
    authToken?.replace("?", "");
    if(authToken){
      localStorage.setItem("token", authToken);
    }
  }

  const {data, isLoading, isSuccess, isError, ...rest} = useQuery('auth', fetchUser, {...config, retry: false, refetchOnMount: "always", cacheTime: 0})

  return { isLoading, user: data?.user, data, isSuccess, isError, ...rest }
}