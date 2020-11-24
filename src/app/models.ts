export enum Priority {
    Low = 0, Medium, High
}

export interface Task {
    desc: string;
    priority: Priority;
}

export interface Todo {
    id: string;
    title: string;
    tasks: Task[];
}

export interface ToDoSummary {
    id: string,
    title: string
}