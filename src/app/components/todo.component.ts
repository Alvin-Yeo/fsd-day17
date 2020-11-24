import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../models'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {

  todoForm: FormGroup;
  tasksArray: FormArray;
  // titleCtrl: FormControl;

  @Input('todoResult') todoResult: Todo;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.createTodo();
    this.tasksArray = this.todoForm.get('tasks') as FormArray;
    // this.titleCtrl = this.todoForm.get('title') as FormControl;
  }

  ngOnChanges() {
    // console.log('todo result onChange: ', this.todoResult);
    if(this.todoResult !== undefined)
      this.todo = this.todoResult;
  }

  private createTodo(): FormGroup {
    return this.fb.group({
      title: this.fb.control('', [ Validators.required ]),
      tasks: this.fb.array([])
    });
  }

  private createTask(): FormGroup {
    return this.fb.group({
      desc: this.fb.control('', [ Validators.required ]),
      priority: this.fb.control('0')
    });
  }

  addTask() {
    const task = this.createTask();
    this.tasksArray.push(task);
  }

  removeTask(t: FormGroup) {
    const index = this.tasksArray.controls.indexOf(t);
    this.tasksArray.removeAt(index);
  }

  showValues() {
    console.log('form values: ', this.todoForm.value);
  }

  get todo(): Todo {
    const t: Todo = this.todoForm.value as Todo;
    t.tasks = t.tasks.map(v => {
      //  @ts-ignore
      v.priority = parseInt(v.priority);
      return v;
    });
    return t;
  }
  set todo(t: Todo) {
    const tempTaskArray = this.fb.array([]);
    
    t.tasks.forEach(task => tempTaskArray.push(new FormGroup({
      desc: this.fb.control(task.desc, [ Validators.required ]),
      priority: this.fb.control(task.priority)
    })));
    
    this.todoForm = this.fb.group({
      title: this.fb.control(t.title, [ Validators.required ]),
      tasks: tempTaskArray
    });

    this.tasksArray = this.todoForm.get('tasks') as FormArray;
  }
}
