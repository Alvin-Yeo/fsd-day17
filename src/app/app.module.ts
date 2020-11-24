import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateTodoComponent } from './components/create-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeTodoComponent } from './components/home-todo.component';
import { TodoComponent } from './components/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoDatabase } from './todo.database';
import { TodoDetailComponent } from './components/todo-detail.component';

const ROUTES: Routes = [
  { path: '', component: HomeTodoComponent },
  { path: 'create', component: CreateTodoComponent },
  { path: 'todo/:todoId', component: TodoDetailComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateTodoComponent,
    HomeTodoComponent,
    TodoComponent,
    TodoDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TodoDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
