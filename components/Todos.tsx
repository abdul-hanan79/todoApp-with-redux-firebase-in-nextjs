import React from 'react'
import useTodos from '../customHooks/useTodos'
import { Input } from '@chakra-ui/react'
import { TodoType } from '../types/TodoType'
function Todos() {
    const { loader, description, todoDescription, todoId, setTodoId,
        setTodoDescription, setDescription, todos, onFileChangeHandler, setTodos, todoEditHandler, onTodoSubmitHandler, todoDeleteHandler, todoUpdateHandler, isUpdate } = useTodos()

    console.log("description", description)
    { console.log("value of todo in todos.tsx", todos) }
    return (
        <div>
            <h1>Todo App</h1>
            <p>enter your list</p>
            {/* <Input placeholder='extra small size' size='xs' /> */}
            <input type="text" placeholder='enter' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="file" onChange={onFileChangeHandler} />
            <button onClick={onTodoSubmitHandler}>Submit</button>
            {

                todos.map((items: TodoType, index: number) => {
                    return (
                        <>
                            {loader && <h1>Loading...</h1>}
                            <div key={index}>
                                <p>{items.id}</p>
                                <img style={{ width: 50, height: 50 }} src={items?.attachmentURL} alt="" />
                                {/* <h5>{items.createdAt}</h5> */}

                                {isUpdate && (items.id == todoId) ? <div> <input type="text" placeholder='enter' value={todoDescription} onChange={(e) => setTodoDescription(e.target.value)} /><button onClick={() => todoUpdateHandler(items)}>Update</button></div> : <div>  <h1>{items.description}</h1><button onClick={() => todoEditHandler(items)}>Edit</button></div>}


                                <button onClick={() => todoDeleteHandler(items)}>Delete</button>
                            </div>
                        </>

                    )
                })
            }

        </div>
    )
}

export default Todos
