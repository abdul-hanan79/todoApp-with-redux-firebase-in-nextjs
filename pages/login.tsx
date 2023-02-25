import { AddIcon } from '@chakra-ui/icons'
import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import MainButton from '../components/MainButton'
import useLogin from '../customHooks/useLogin'

const login = () => {
    const user = useSelector((state: any) => state.authSlice.singupUser)
    const { email,
        setEmail,
        password,
        setPassword,
        loader, goToSignupPage,
        onSubmitHandler } = useLogin()

    return (
        <Box w="100%" h="100vh" bgGradient="linear(to-b, rgb(52,131,200), rgb(6,200,250))" display="flex" flexDirection="column" alignItems="center" justifyContent="center" pr={8} pl={8}>

            <Text align="center" bgClip="text"
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                fontSize={{ base: '2.2rem', md: '4.2rem', lg: '4.2rem' }}
                fontWeight="extrabold">User Login</Text>
            <Box w="50%" h="auto" bg="rgb(209,228,244)" p={3} borderRadius={15}>
                <Input type="text" onChange={(e) => setEmail(e.target.value)} size='lg' placeholder='enter email'
                    borderColor='blue.400' />
                <Input type="password" onChange={(e) => setPassword(e.target.value)} size='lg' placeholder='enter password'
                    borderColor='blue.400' />
                <MainButton onClick={onSubmitHandler} text="Log In" />
                <Text>dont' have account? </Text> <MainButton onClick={goToSignupPage} text="Sign Up" />

            </Box>
        </Box>
    )
}

export default login