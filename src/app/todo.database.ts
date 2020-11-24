import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Todo, ToDoSummary } from './models';

@Injectable()

export class TodoDatabase extends Dexie {
    private todo: Dexie.Table<Todo, string>;    // Type of primary key (id): string

    constructor() {
        // database name
        super('TodoDB');

        // setup schema for version 1
        this.version(1).stores({
            todo: "id"
        });

        // get a reference to the todo collection
        this.todo = this.table('todo');
    }

    async addTodo(t: Todo): Promise<any> {
        return await this.todo.put(t);  // update and insert
    }

    async getTodo(id: string): Promise<Todo> {
        return await this.todo.get(id) as Todo;
    }

    async updateTodo(t: Todo, id: string): Promise<any> {
        return await this.todo.put(t, id);  
    }

    async deleteTodo(id: string): Promise<any> {
        return await this.todo.delete(id);
    }

    async getToDoSummary(): Promise<ToDoSummary[]> {
        return (await this.todo.toArray()).map(d => {
            return {
                id: d.id,
                title: d.title
            } as ToDoSummary;
        });
    }
}