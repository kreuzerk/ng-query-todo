import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Todo} from "./todo.model";
import {lastValueFrom} from "rxjs";

const BE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos = signal<Todo[]>([]);
  #httpClient = inject(HttpClient);

  public getTodos(): Promise<Todo[]>  {
    return lastValueFrom(this.#httpClient.get<Todo[]>(`${BE_URL}/todos`));
  }

  public addTodo(todo: string) {
    return lastValueFrom(this.#httpClient.post<Todo>(`${BE_URL}/todos`, {
      title: todo,
      done: false
    }));
  }

  public deleteTodo(id: string) {
    return lastValueFrom(this.#httpClient.delete<Todo>(`${BE_URL}/todos/${id}`));
  }
}
