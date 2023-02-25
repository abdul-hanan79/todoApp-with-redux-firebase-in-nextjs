import React from 'react'
import useTodos from '../customHooks/useTodos'
import { Button, Image, Spinner } from '@chakra-ui/react'
import { TodoType } from '../types/TodoType'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Checkbox, Input, Text } from '@chakra-ui/react'
import { DeleteIcon, AddIcon, EditIcon, CheckIcon } from '@chakra-ui/icons'
import MainButton from './MainButton'
import DeleteAlertDialog from './DeleteAlrtDialog'
import { useSelector } from 'react-redux'
function Todos() {
    const { loader, description, todoDescription, todoId, setTodoId, itemEditInput,
        setItemEditInput, user, currentUserRequestLoader, setTodoDescription, setDescription, onFileChangeHandler, todoEditHandler, onTodoSubmitHandler, todoDeleteHandler, todoUpdateHandler, isUpdate, alertBox, onTodoDeleteAllHandler } = useTodos()


    const storeTodos = useSelector((state: any) => state.todoSlice.todos)
    console.log("user is", user?.email);
    const email = user?.email
    const username = email?.split("@")[0];
    console.log("the username is",username); // Output: "abdulhanan3279"

    console.log("description", description)
    { console.log("value of todo in todos.tsx", storeTodos) }
    if (currentUserRequestLoader) {
        return <h1><Spinner thickness='7px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl' /></h1>
    }
    return (
        <Box w="100%" h="auto" bg="rgb(209,228,244)" p={3} borderRadius={15}>
            {alertBox && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>List Cannot be empty</AlertTitle>
                <AlertDescription>Please Enter Your Todo!</AlertDescription>
            </Alert>}
            {/* <Input placeholder='extra small size' size='xs' /> */}
            <Box display='flex'>
                {user && <h1>{username}</h1>}
                <Input
                    color='#343a40'
                    size='lg'
                    borderColor='blue.400'

                    placeholder='Enter your todos'
                    _placeholder={{ color: 'inherit' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    mr="2"
                />

                <Input type="file" onChange={onFileChangeHandler} size='lg'
                    borderColor='blue.400' />
                <MainButton onClick={onTodoSubmitHandler} icon={<AddIcon boxSize={5} />} />
                <DeleteAlertDialog onClick={onTodoDeleteAllHandler} icon={<DeleteIcon boxSize={5} />} />

            </Box>
            {loader && <Spinner
                thickness='7px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />}
            {

                storeTodos.map((item: TodoType, index: number) => {
                    return (
                        <>
                            <Box key={index} mt={2}  >
                                {/* checkbox errror */}
                                <Box bg="white" w="100%" border='1px' borderColor='gray.200' borderRadius={10} p={2}>
                                    {/* <ListIcon color='green.500' /> */}
                                    {isUpdate && item.id == todoId ? <Box display='flex' justifyContent="space-between" alignItems="center
                                "  w="22rem"> <Input
                                            color='#343a40'
                                            fontSize='1.2rem'
                                            placeholder='Enter your todos'
                                            _placeholder={{ color: 'inherit' }}
                                            value={itemEditInput}
                                            onChange={(e) => setItemEditInput(e.target.value)}
                                        /><MainButton onClick={() => todoUpdateHandler(item)} icon={<CheckIcon boxSize={3} />} /></Box> : <Box display='flex' justifyContent="space-between" alignItems="center
                                "  w="auto" >
                                        <Text fontSize="1.2rem"
                                        >{item.description}</Text>
                                        <Image
                                            boxSize='50px'
                                            objectFit='cover'
                                            src={item?.attachmentURL}
                                            alt='No Image'
                                        />
                                        <Box display='grid' gap={1} gridAutoFlow="column dense">
                                            <MainButton onClick={() => {
                                                todoEditHandler(item)
                                            }} icon={<EditIcon boxSize={3} />} />
                                            <DeleteAlertDialog onClick={() => todoDeleteHandler(item)} icon={<DeleteIcon boxSize={3} />} />


                                        </Box>
                                    </Box>}
                                </Box>

                            </Box>
                        </>

                    )
                })
            }

        </Box>
    )
}

export default Todos
