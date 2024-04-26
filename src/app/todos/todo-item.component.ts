import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {Todo} from "./todo.model";

@Component({
  standalone: true,
  selector: 'todo-item',
  template: `
    <div class="todo-item">
        {{ todo.title }}
        <span
                (click)="onDelete.next()"
                class="material-symbols-outlined delete-icon">delete</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TodoItemComponent {
  @Input({required: true}) todo!: Todo;
  @Output() onDelete = new EventEmitter<void>();
}
