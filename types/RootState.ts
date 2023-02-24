import { TodoState } from "./StoreType";

interface RootState {
    todoSlice: TodoState;
    // ... add more slices of state as needed
}

export default RootState;