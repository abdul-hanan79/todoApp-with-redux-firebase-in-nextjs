import { configureStore } from '@reduxjs/toolkit'
// import TodoSlice from './todoSlice';?
import todoSlice from './todoSlice';
import authSlice from './authSlice';
// console.log("todoSlic in store ==> ",todoSlice.todos);
const store = configureStore({

    reducer: {
        todoSlice,
        authSlice
    }
});

// console.log("todos in store",store.getState().todoSlice);
export default store;
