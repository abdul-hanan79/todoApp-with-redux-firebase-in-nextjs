// import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/Firebase";
import { EditIcon } from "@chakra-ui/icons";
import { TodoType } from "../types/TodoType";


export const submitTodo = createAsyncThunk("todos/submitTodos", async ([description, attachmentImage]: [string, Blob]) => {
    console.log("submit Todo is running");
    console.log("the value of description in submit todo", description, attachmentImage);
    try {
        const storageRef = ref(storage, `/todosImages/${description}.jpg`);
        const result = await uploadBytes(storageRef, attachmentImage)
        // const result = await storageRef.put(attachmentImage);
        console.log("result ========>", result.ref);
        const downloadURL = await getDownloadURL(result.ref)
        console.log("downloadURL", downloadURL);
        const newDoc = {
            description,
            attachmentURL: downloadURL,
            createdAt: new Date()
        }
        const docRef = await addDoc(collection(db, 'todoapp'), newDoc)
        console.log("docRef id ", docRef.id)
        const submitedDoc = {
            ...newDoc,
            id: docRef.id
        }

        console.log("submited doc", submitedDoc);
        return submitedDoc
        // setTodos([...todos, { ...newDoc, id: docRef.id }])
    }
    catch (e) {
        console.log("error in submit hadnler")
    }
})
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    console.log("get todos method");

    try {
        const querySnapshot = await getDocs(collection(db, "todoapp"));
        let todosList: TodoType[] = [];
        querySnapshot.forEach((doc) => {
            todosList.push({
                attachmentURL: doc.data()?.attachmentURL,
                description: doc.data()?.description,
                id: doc.id,
                createdAt: doc.data()?.createdAt,
            });
        });

        console.log("todos in action - slice", todosList);
        return todosList;
    } catch (error) {
        console.log("================catch====================");
        console.log(error);
        console.log("====================================");
    }
});


export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (item: TodoType) => {
    try {
        console.log("item found in thunk action", item);



        const desertRef = ref(storage, `todosImages/${item.description}.jpg`);
        await deleteObject(desertRef)
        await deleteDoc(doc(db, "todoapp", item.id));
        console.log("deleteing");
        return item
    } catch (error) {
        console.log("error", error);

    }

})

interface UpdateTodoArgs {
    itemEditInput: string;
    item: {
        id: string,
        description: string,
        attachmentURL: string,
        createdAt: object
    }
}
// export const updateTodo = createAsyncThunk("todos/updateTodos", async ({ itemEditInput, item }: UpdateTodoArgs) => {
//     try {
//         console.log("item found in thunk update action", itemEditInput, item);

//         // Get a reference to the old image file
//         const oldImageRef = ref(storage, `todosImages/${item.description}.jpg`);

//         // Delete the old image file
//         await deleteObject(oldImageRef);

//         // Construct the new file name using the new description
//         const newFileName = `${itemEditInput}.jpg`;

//         // Get a reference to the new image file
//         const newImageRef = ref(storage, `todosImages/${newFileName}`);

//         // Upload the new image file to Storage
//         await put(newImageRef, attachmentImage);

//         // Update the document in Firestore with the new description and the new file name
//         await updateDoc(doc(db, "todoapp", item.id), {
//             capital: true,
//             description: itemEditInput,
//             imageFileName: newFileName,
//             createdAt: new Date()
//         });

//         return { itemEditInput, item };

//     } catch (error) {
//         alert(`error in update todo  ${error}`);
//     }
// });

export const updateTodo = createAsyncThunk("todos/updateTodos", async ({ itemEditInput, item }: UpdateTodoArgs) => {
    try {
        console.log("item found in thunk update action", itemEditInput, item);


        // !IMPORT TO DO 
        // const desertRef = ref(storage, `todosImages/${item.description}.jpg`);
        // await deleteObject(desertRef)
        // await deleteDoc(doc(db, "todoapp", item.id))
        // let filteredTodos = todos.filter((todo) => item.id !== todo.id)
        // setTodos(filteredTodos)
        await updateDoc(doc(db, "todoapp", item.id), {
            capital: true,
            description: itemEditInput,
            createdAt: new Date()
        });
        return { itemEditInput, item }

    } catch (error) {
        alert(`error in update todo  ${error}`)
    }


})
// Define your slice
const todoSlice = createSlice({
    name: 'TodoSlice',
    initialState: { todos: [], error: null },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            console.log("state in extra builder", state)
            console.log("fetch todo in extra reducers", action.payload);
            let newState: any = {
                ...state,
                todos: action.payload,
            };
            console.log("fetched data ", newState);
            return newState;
        });



        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            console.log("add case in extra redyce", action.payload);
            const todos: TodoType[] = state.todos;
            const item = action.payload;
            if (!item) {
                return state;
            }
            let filteredTodos = todos.filter((todo) => item.id !== todo.id);
            let newState: any = {
                ...state,
                todos: filteredTodos,
            };
            return newState;
        });

        builder.addCase(submitTodo.fulfilled, (state, action) => {
            console.log("submit case in extra reducer", action.payload);
            // setTodos([...todos, { ...newDoc, id: docRef.id }])
            let newState: any = {
                ...state,
                todos: [...state.todos, action.payload]
            };
            console.log("new state is ", newState.todos);
            console.log("new state is ",newState);
            // fetchTodos()
            return newState
        });
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            console.log("item  case in extra reduce", action.payload?.itemEditInput);
            console.log("update  case in extra reduce", action.payload?.item);
            const todos: TodoType[] = state.todos;
            const item = action.payload?.item;
            let updatedTodos = todos.map((todo) => {
                console.log('====================================');
                console.log(item?.id, todo.id);
                console.log('====================================');
                if (item?.id === todo.id) {
                    return {
                        description: action.payload?.itemEditInput,
                        createdAt: new Date(),
                        id: todo.id,
                        attachmentURL: item?.attachmentURL
                    }
                }
                else {
                    return todo;
                }
            });
            console.log("updated Todos", updatedTodos);
            let newState: any = {
                ...state,
                todos: updatedTodos,
            };
            return newState;
        });



    },
});

// Export the reducer

export default todoSlice.reducer