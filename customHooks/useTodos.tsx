import firebase from 'firebase/app';
import 'firebase/storage';
import { useEffect, useState } from "react"
import { TodoType } from "../types/TodoType"
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo, submitTodo, fetchTodos } from "../store/todoSlice";
import RootState from '../types/RootState';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from 'redux';


// const storeTodos=useSelector((store)=>store.todoSlice.todos)
// const storeTodos = useSelector((state) => state.todoSlice.todos)
// const storeTodos = [{
//     id: '3213123123',
//     description: "hello"
// },]
// code is not working here " cannot read properties of null (reading 'use context')"
// const data=useSelector((state)=>state.todoSlice.todos)
// console.log("data in useTodos",data);
const useTodos = () => {
    const [description, setDescription] = useState<string>('')
    const [todoDescription, setTodoDescription] = useState("")
    const [todoId, setTodoId] = useState("")
    const [loader, setLoader] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [attachmentURL, setAttachmentURL] = useState('')
    const [itemEditInput, setItemEditInput] = useState("")
    const [attachmentImage, setAttachmentImage] = useState({})
    const [alertBox, setAlertBox] = useState(false)
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    console.log("value of edit item input", itemEditInput);



    useEffect(() => {
        console.log("UseTodos component just render");
        try {
            dispatch(fetchTodos())

        }
        catch (e) {
            console.log("message in fetch todos", e);
        }


    }, [])
    const onFileChangeHandler = async (e: any) => {
        console.log("file change handler", e.target.files[0]);
        // const file = e.target.files[0]
        // setAttachmentImage(file)
        if (e.target.files > 0) {
            const file = e.target.files[0];
            // const blob = new Blob([file], { type: file.type });
            // Pass the `blob` object to the `submitTodo` function
            //   console.log("file attachment image is",blob)
            setAttachmentImage(file)
            console.log("attachment Image have value", attachmentImage);
        }
    }

    const onTodoSubmitHandler = async () => {
        console.log("attachment Image onTodoSubmitHandler", attachmentImage);
        console.log("submit button is clicked")
        try {

            if (description != '') {

                setLoader(true)
                await dispatch(submitTodo([description, attachmentImage]));
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
    const todoDeleteHandler = async (item: TodoType) => {
        console.log("get into deleteHandler")
        try {
            setLoader(true)
            // await
            await dispatch(deleteTodo(item))
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
    const todoUpdateHandler = async (item: TodoType) => {
        try {
            setLoader(true)
            console.log("edit input in update hadnler", itemEditInput);
            await dispatch(updateTodo({ itemEditInput, item }))
        }
        catch (error) {
            alert(`error in update---< ${error}`)
        }
        finally {
            setLoader(false)
            setIsUpdate(false)
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
        // storeTodos,
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