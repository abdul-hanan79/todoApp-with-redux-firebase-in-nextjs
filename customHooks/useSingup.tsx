import { async } from '@firebase/util'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { auth, createUserWithEmailAndPassword } from '../config/Firebase'
import { signupUser } from '../store/authSlice'
// import { toast } from "react-toastify";
const useSingup = () => {
    const [userName, setUsername] = useState<string>("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const onSubmitHandler = async () => {
        try {
            setLoader(true)

            // const response = await createUserWithEmailAndPassword(auth, email, password)
            // console.log("response user+++++>", response.user);
            // sessionStorage.setItem('Token', response.user.accessToken);
            await dispatch(signupUser({ email, password }))
            // alert('Successfully singup!');
            router.push('/login')
        }
        catch (e) {
            console.log("error in signup ", e);
        }
        finally {
            setLoader(false)
        }
    }
    return {
        userName,
        setUsername,
        email,
        setEmail,
        password, setPassword, loader, onSubmitHandler
    }
}

export default useSingup
