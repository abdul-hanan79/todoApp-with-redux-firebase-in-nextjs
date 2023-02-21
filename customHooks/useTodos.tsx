
import firebase from 'firebase/app';
import 'firebase/storage';
import { use, useEffect, useState } from "react"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from '../config/Firebase'
import { TodoType } from "../types/TodoType"
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo, submitTodo, fetchTodos } from "../store/todoSlice";

const useTodos = () => {
    // const [todos, setTodos] = useState<TodoType[]>([])
    const [description, setDescription] = useState<string>('')
    const [todoDescription, setTodoDescription] = useState("")
    const [todoId, setTodoId] = useState("")
    const [loader, setLoader] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [attachmentURL, setAttachmentURL] = useState('')
    const [itemEditInput, setItemEditInput] = useState("")
    const [attachmentImage, setAttachmentImage] = useState({})
    const [alertBox, setAlertBox] = useState(false)
    // const [oldItem, setOldItem] = useState({})
    const dispatch = useDispatch()
    console.log("value of edit item input", itemEditInput);

    const storeTodos = useSelector((state) => state.todoSlice.todos)
    useEffect(() => {
        console.log("Todos component just render");
        try {
            setLoader(true)
            dispatch(fetchTodos())

        }
        catch (e) {
            console.log("message in fetch todos", e);
        }
        finally {
            setLoader(false)
        }

    }, [])



    // const getTodosHandler = async () => {
    //     console.log("get todos method");
    //     console.log("get todos method is running +++++++++++>");

    //     try {
    //         setLoader(true)
    //         const querySnapshot = await getDocs(collection(db, "todoapp"));
    //         let todosList: TodoType[] = []
    //         console.log("value of todoList", todosList)
    //         querySnapshot.forEach((doc) => {
    //             console.log("document", doc);
    //             todosList.push({
    //                 attachmentURL: doc.data()?.attachmentURL,
    //                 description: doc.data()?.description,
    //                 id: doc.id,
    //                 createdAt: doc.data()?.createdAt
    //             });

    //         });


    //         console.log("todolist", todosList);

    //         setTodos(todosList)
    //         console.log("todolost in get todos", todos);
    //     }
    //     catch (e) {
    //         console.log("error in getTodosHandler", e)
    //     }
    //     finally {

    //         setLoader(false)
    //     }
    // }
    const onFileChangeHandler = async (e: any) => {
        console.log("file change handler", e.target.files[0]);
        setAttachmentImage(e.target.files[0])
        console.log("attachment Image have value", attachmentImage);

    }

    const onTodoSubmitHandler = async () => {
        console.log("attachment Image onTodoSubmitHandler", attachmentImage);
        console.log("submit button is clicked")
        try {

            if (description != '') {

                setLoader(true)

                dispatch(submitTodo(description, attachmentImage))


                // const docRef = await addDoc(collection(db, 'todoapp'), newDoc)
                // console.log("docRef id ", docRef.id)
                // setTodos([...todos, { ...newDoc, id: docRef.id }])
                // getTodosHandler()

            }
            else {
                setAlertBox(true)
                setTimeout(() => {
                    setAlertBox(false)
                }, 2000);
            }
        }
        catch (e) {
            console.log("error on onTodoSubmitHandler", e)
        }
        finally {
            setLoader(false)
            setDescription('')
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
            // await
            dispatch(deleteTodo(item))
            console.log("delte todo is running");
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
        setItemEditInput(item.description)
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
            setLoader(true)
            console.log("edit input in update hadnler", itemEditInput);
            dispatch(updateTodo(itemEditInput, item))
            // const desertRef = ref(storage, `todosImages/${item.description}.jpg`);
            // await deleteObject(desertRef)
            // try {
            //     // Reference to the original image
            //     var oldImageRef = firebase.storage().ref(`todosImages/${item.description}.jpg`);

            //     // Reference to the new image
            //     var newImageRef = firebase.storage().ref('new_image.jpg');

            //     // Copy the image to the new location
            //     await oldImageRef.copyTo(newImageRef);

            //     // Delete the old image
            //     await oldImageRef.delete();

            //     console.log('Image renamed successfully');
            // } catch (error) {
            //     console.error('Error renaming the image:', error);
            // }
            // console.log("update the vlude",item.description)
            //     await updateDoc(doc(db, "todoapp", item.id), {
            //         capital: true,
            //         description: itemEditInput,
            //         createdAt: new Date()
            //     });
            //     let updatedTodos = todos.map((todo: TodoType) => {
            //         console.log('====================================');
            //         console.log(item.id, todo.id);
            //         console.log('====================================');
            //         if (item.id === todo.id) {
            //             return {

            //                 description: itemEditInput,
            //                 createdAt: new Date(),
            //                 id: todo.id,

            //             }
            //         }
            //         else {
            //             return todo
            //         }
            //     })

            //     console.log("updateTodo", updatedTodos);
            //     setTodos(updatedTodos)
            //     console.log("value of todo after changes", todos)
            //     setIsUpdate(false)
        }
        catch (error) {
            alert(`error in update---< ${error}`)
        }
        finally {
            setLoader(false)
        }
    }

    // async function deleteAllDocuments(collection) {
    //     const snapshot = await collection.get();
    //     snapshot.forEach(doc => {
    //         doc.ref.delete();
    //     });
    // }
    const onTodoDeleteAllHandler = async () => {
        console.log("get into deleteHandler")
        // try {
        //     setLoader(true)
        //     const desertRef = ref(storage, `todosImages/`);
        //     const firestore = firebase.firestore();
        //     const collectionRef = firestore.collection("your-collection-name");
        //     deleteAllDocuments(collectionRef);
        //     let filteredTodos: TodoType[] = []
        //     setTodos(filteredTodos)

        // }
        // catch (error) {
        //     console.log("error in todoDeleteHandler", error);

        // }
        // finally {
        //     setLoader(false)
        // }
    }

    return {
        // todos,
        storeTodos,
        isUpdate,
        loader,
        description,
        todoDescription,
        todoId,
        itemEditInput,
        alertBox,
        setItemEditInput,
        setTodoId,
        setTodoDescription,
        // setTodos,

        todoUpdateHandler,
        onTodoSubmitHandler,
        todoDeleteHandler,
        setDescription,
        todoEditHandler,
        onFileChangeHandler,
        onTodoDeleteAllHandler
    }

}
export default useTodos