import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDatabase } from '../todo.database';
import { TodoComponent } from './todo.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  @ViewChild('myTodo') todoRef: TodoComponent;

  constructor(private todoDB: TodoDatabase, private router: Router) { }

  ngOnInit(): void {
  }

  async addTodo() {
    // Generate a new id for todo
    const id = uuidv4().toString().substring(0, 8);
    const todo = this.todoRef.todo;
    todo.id = id;

    // Save to the database
    await this.todoDB.addTodo(todo);

    // Navigate to /
    this.router.navigate(['/']);
  }

  checkInvalidFields(): boolean {
    if(this.todoRef === undefined) {
      return true;
    } else {
      if(this.todoRef.todo.title === '' )
        return true;

      if(this.todoRef.todo.tasks.length > 0)
        return this.todoRef.todo.tasks.some(t => t.desc === '');
    }

    return false;
  }
}
