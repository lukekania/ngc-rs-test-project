import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  imports: [FormsModule],
  template: `
    <form #f="ngForm" (ngSubmit)="submit(f.value)">
      <label>
        name
        <input name="name" [(ngModel)]="model.name" required minlength="2" #name="ngModel" />
        @if (name.invalid && (name.dirty || name.touched)) {
          <em class="err">name needs at least 2 characters</em>
        }
      </label>
      <label>
        accept terms
        <input type="checkbox" name="accepted" [(ngModel)]="model.accepted" required />
      </label>
      <button type="submit" [disabled]="f.invalid">submit</button>
      @if (last()) {
        <pre class="ok">{{ last() }}</pre>
      }
    </form>
  `,
  styles: [
    `
      form {
        display: grid;
        gap: 0.5rem;
        max-width: 24rem;
      }
      label {
        display: grid;
        gap: 0.25rem;
      }
      .err {
        color: #c62828;
        font-size: 0.85rem;
        font-style: normal;
      }
      .ok {
        background: #e8f5e9;
        padding: 0.5rem;
        border-radius: 4px;
      }
    `,
  ],
})
export class TemplateFormComponent {
  protected model = { name: '', accepted: false };
  readonly last = signal('');

  submit(value: unknown) {
    this.last.set(JSON.stringify(value, null, 2));
  }
}
