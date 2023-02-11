import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Error = () => {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 5000)
    }, [])
    return (
        <div>
            error
        </div>
    )
}

export default Error
