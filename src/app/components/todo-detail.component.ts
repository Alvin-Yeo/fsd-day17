import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models';
import { TodoDatabase } from '../todo.database';
import { TodoComponent } from './todo.component';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo;
  todoId: string;

  @ViewChild('myTodo') todoRef: TodoComponent;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private todoDB: TodoDatabase,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todoId = this.activatedRoute.snapshot.params['todoId'];
    
    this.todoDB.getTodo(this.todoId)
      .then(result => {
        this.todo = result;
        // console.log('>>> Single Todo: ', result);
      });
  }

  async deleteTodo() {
    await this.todoDB.deleteTodo(this.todoId);
    this.router.navigate(['/']);
  }

  async updateTodo() {
    const todo = this.todoRef.todo;
    todo.id = this.todoId;
    
    await this.todoDB.updateTodo(todo, this.todoId);
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
