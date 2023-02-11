import { async } from '@firebase/util'
import { auth, signInWithEmailAndPassword } from '../config/Firebase'

import { useRouter } from 'next/router'
import React, { useState } from 'react'

const useLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const onSubmitHandler = async () => {
        try {
            setLoader(true)
            const response = await signInWithEmailAndPassword(auth, email, password)

            // console.log("response user+++++>", response.UserImpl.accessToken);
            router.push('/homePage')
        }
        catch (e) {
            console.log("error in login", e);
        }
        finally {
            setLoader(false)
        }
    }
    return {
        email,
        setEmail,
        password,
        setPassword,
        loader,
        onSubmitHandler

    }
}

export default useLogin
