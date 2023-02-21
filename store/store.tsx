import { configureStore } from '@reduxjs/toolkit'
// import TodoSlice from './todoSlice';?
import todoSlice from './todoSlice';

const store = configureStore({
    reducer: {
        todoSlice
    }
});


export default store;
