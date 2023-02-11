import { use, useEffect, useState } from "react"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from '../config/Firebase'
import { TodoType } from "../types/TodoType"

const useTodos = () => {

    const [todos, setTodos] = useState<TodoType[]>([])
    const [description, setDescription] = useState<string>('')
    const [todoDescription, setTodoDescription] = useState("")
    const [todoId, setTodoId] = useState("")
    const [loader, setLoader] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [attachmentURL, setAttachmentURL] = useState('')

    const [attachmentImage, setAttachmentImage] = useState({})
    // const [oldItem, setOldItem] = useState({})

    useEffect(() => {
        console.log("Todos component just render");
        getTodosHandler()

    }, [])



    const getTodosHandler = async () => {
        console.log("get todos method");
        console.log("get todos method is running +++++++++++>");
        try {
            setLoader(true)
            const querySnapshot = await getDocs(collection(db, "todoapp"));
            let todosList: TodoType[] = []
            console.log("value of todoList", todosList)
            querySnapshot.forEach((doc) => {
                console.log("document", doc);
                todosList.push({
                    attachmentURL: doc.data()?.attachmentURL,
                    description: doc.data()?.description,
                    id: doc.id,
                    createdAt: doc.data()?.createdAt
                });

            });


            console.log("todolist", todosList);

            setTodos(todosList)
            console.log("todolost in get todos", todos);
        }
        catch (e) {
            console.log("error in getTodosHandler", e)
        }
        finally {

            setLoader(false)
        }
    }
    const onFileChangeHandler = async (e: any) => {
        console.log("file change handler", e.target.files[0]);
        setAttachmentImage(e.target.files[0])
        console.log("attachment Image", attachmentImage);

    }

    const onTodoSubmitHandler = async () => {
        console.log("attachment Image", attachmentImage);


        try {
            setLoader(true)
            const storageRef = ref(storage, `/todosImages/${description}.jpg`);
            const result = await uploadBytes(storageRef, attachmentImage)
            // const result = await storageRef.put(attachmentImage);
            console.log("result ========>", result.ref);
            const downloadURL = await getDownloadURL(result.ref)
            const newDoc = {
                description,
                attachmentURL: downloadURL,
                createdAt: new Date()
            }
            const docRef = await addDoc(collection(db, 'todoapp'), newDoc)
            console.log("docRef id ", docRef.id)
            setTodos([...todos, { ...newDoc, id: docRef.id }])
            setDescription('')
            getTodosHandler()
        }
        catch (e) {
            console.log("error on onTodoSubmitHandler", e)
        }
        finally {
            setLoader(false)
        }
    }


    // const todoDeleteHandler = async (item: TodoType) => {
    //     try {
    //         await deleteDoc(doc(db, "todos", item.id));
    //         let filteredTodos = todos.filter((todo: TodoType) => item.id !== todo.id)
    //         setTodos(filteredTodos)
    //     } catch (error) {
    //         alert(error)
    //     }
    // }
    const todoDeleteHandler = async (item: TodoType) => {
        console.log("get into deleteHandler")
        try {
            setLoader(true)
            const desertRef = ref(storage, `todosImages/${item.description}.jpg`);
            await deleteObject(desertRef)
            await deleteDoc(doc(db, "todoapp", item.id))
            let filteredTodos = todos.filter((todo) => item.id !== todo.id)
            setTodos(filteredTodos)

        }
        catch (error) {
            console.log("error in todoDeleteHandler", error);

        }
        finally {
            setLoader(false)
        }
    }


    const todoEditHandler = (item: TodoType) => {
        console.log("updated handler====-", item);
        setTodoDescription(item.description)
        setIsUpdate(true)
        setTodoId(item.id)
    }

    // const todoUpdateHandler = async (item: TodoType) => {
    //     console.log("todoUpdateHandler");
    //     setLoader(true)
    //     try {

    //         await updateDoc(doc(db, "todoapp", item.id), {
    //             capital: true
    //         });
    //         let updatedTodos = todos.map((todo: TodoType) => {
    //             if (item.id === todo.id) {
    //                 return {
    //                     description: todoDescription,
    //                     createAt: new Date(),
    //                     id: todo.id
    //                 }
    //             }
    //             else {
    //                 return todo
    //             }

    //         })
    //         console.log("updateTodo", updatedTodos);
    //         setTodos(updatedTodos)
    //         console.log("value of todo after changes", todos)
    //         setIsUpdate(false)

    //     }
    //     catch (error) {
    //         console.log("error in todoupdating", error);
    //     }
    //     finally {
    //         setLoader(false)
    //     }
    // }

    const todoUpdateHandler = async (item: TodoType) => {
        try {
            await updateDoc(doc(db, "todoapp", item.id), {
                capital: true,
                description: todoDescription,
                createdAt: new Date()
            });
            let updatedTodos = todos.map((todo: TodoType) => {
                console.log('====================================');
                console.log(item.id, todo.id);
                console.log('====================================');
                if (item.id === todo.id) {
                    return {

                        description: todoDescription,
                        createdAt: new Date(),
                        id: todo.id,

                    }
                }
                else {
                    return todo
                }
            })

            console.log("updateTodo", updatedTodos);
            setTodos(updatedTodos)
            console.log("value of todo after changes", todos)
            setIsUpdate(false)
        } catch (error) {
            alert(error)
        }
        finally {
            setLoader(false)
        }
    }

    return {
        todos,
        isUpdate,
        loader,
        description,
        todoDescription,
        todoId,
        setTodoId,
        setTodoDescription,
        setTodos,
        getTodosHandler,
        todoUpdateHandler,
        onTodoSubmitHandler,
        todoDeleteHandler,
        setDescription,
        todoEditHandler,
        onFileChangeHandler
    }

}
export default useTodos