export interface Todo{
    id:number;
    content:string;
    completed:boolean;
}

export type TodoList = Todo[];


export enum StorageKey {
    TODOS = 'todos'
}