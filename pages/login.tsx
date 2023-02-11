import React from 'react'
import useLogin from '../customHooks/useLogin'

const login = () => {
    const { email,
        setEmail,
        password,
        setPassword,
        loader,
        onSubmitHandler } = useLogin()
    return (
        <div>
            <h1>hello this is login page</h1>

            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={onSubmitHandler}>Login</button>
        </div>
    )
}

export default login