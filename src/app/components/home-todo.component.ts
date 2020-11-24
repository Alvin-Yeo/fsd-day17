import { Component, OnInit } from '@angular/core';
import { ToDoSummary } from '../models';
import { TodoDatabase } from '../todo.database';

@Component({
  selector: 'app-home-todo',
  templateUrl: './home-todo.component.html',
  styleUrls: ['./home-todo.component.css']
})
export class HomeTodoComponent implements OnInit {

  todos: ToDoSummary[] = [];

  constructor(private todoDB: TodoDatabase) { }

  ngOnInit(): void {
    this.todoDB.getToDoSummary()
      .then(result => {
        this.todos = result;
        // console.log('>>> Summary: ', result);
      })
  }

}
