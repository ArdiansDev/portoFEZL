import { useMutation } from 'react-query'
import { client } from "utils/client"

const signInUser = async (data = {}) => {
    return client('/auth/sign_in', { method: "POST", data }).then(data => {
        localStorage.setItem("token", data.authUser);
        return data
    })
}

const useSignIn = () => {
    return useMutation(updates => signInUser(updates))
}

export { useSignIn, signInUser } 

