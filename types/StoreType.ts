
export type TodoState = {
    todos: Todo[];
    error: string | null;
}

interface Todo {
    id: string,
    description: string,
    attachmentURL: string,
    createdAt: object
}
