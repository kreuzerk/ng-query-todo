import {ChangeDetectionStrategy, Component, inject, signal} from "@angular/core";
import {injectMutation, injectQuery, injectQueryClient} from "@tanstack/angular-query-experimental";
import {FormsModule} from "@angular/forms";

import TodoItemComponent from "./todo-item.component";
import {TodosService} from "./todos.service";
import {TODOS_QUERY_KEY} from "./todos.query-keys";

@Component({
  standalone: true,
  selector: 'todo-editor',
  template: `
      <div class="todo-editor">
          <input
                  placeholder="What needs to be done?"
                  type="text"
                  [(ngModel)]="inputValue"
                  (keydown.enter)="onAddTodo()"
          />
          @for (todo of query.data(); track $index) {
              <todo-item [todo]="todo" (onDelete)="onDeleteTodo(todo.id)"/>
          }
      </div>
      <span class="made-with-heart">
          made with ❤️ by Nivek
      </span>
  `,
  imports: [
    TodoItemComponent,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TodoEditorComponent {
  #todosService = inject(TodosService);
  #client = injectQueryClient();

  inputValue = signal('');

  query = injectQuery<any>(() => ({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: () => this.#todosService.getTodos()
  }));

  addTodo = injectMutation(() => ({
    mutationFn: (todo: string) => this.#todosService.addTodo(todo),
    onSuccess: () => {
      this.#client.invalidateQueries({queryKey: [TODOS_QUERY_KEY]})
    }
  }));

  deleteTodo = injectMutation(() => ({
    mutationFn: (todoId: string) => this.#todosService.deleteTodo(todoId),
    onSuccess: () => {
      this.#client.invalidateQueries({queryKey: [TODOS_QUERY_KEY]})
    }
  }));

  onAddTodo() {
    this.addTodo.mutate(this.inputValue())
    this.inputValue.set('');
  }

  onDeleteTodo(id: string) {
    this.deleteTodo.mutate(id);
  }

}
