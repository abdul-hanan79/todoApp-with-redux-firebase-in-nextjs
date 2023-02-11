import React from 'react'
import useSingup from '../customHooks/useSingup'

const signup = () => {
    const { userName,
        setUsername,
        email,
        setEmail,
        password, setPassword, loader, onSubmitHandler } = useSingup()
    { console.log(email, userName, password) }
    return (
        <div>
            <h1>Signup Form</h1>
            <p>please enter your details</p>

            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={onSubmitHandler}>Submit</button>
        </div>
    )
}

export default signup
