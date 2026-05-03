import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './validators/forbidden-name.validator';
import { uniqueUsernameValidator } from './validators/unique-username.validator';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>
        username
        <input formControlName="username" />
        @if (form.controls.username.pending) {
          <em class="hint">checking…</em>
        } @else if (form.controls.username.errors?.['taken']) {
          <em class="err">that username is taken</em>
        } @else if (form.controls.username.errors?.['forbidden']) {
          <em class="err">forbidden name</em>
        } @else if (form.controls.username.errors?.['required'] && form.controls.username.touched) {
          <em class="err">required</em>
        }
      </label>

      <label>
        email
        <input type="email" formControlName="email" />
        @if (form.controls.email.errors?.['email'] && form.controls.email.touched) {
          <em class="err">not a valid email</em>
        }
      </label>

      <fieldset formArrayName="tags">
        <legend>tags ({{ tags.length }})</legend>
        @for (ctrl of tags.controls; track $index) {
          <div class="tag-row">
            <input [formControlName]="$index" />
            <button type="button" (click)="removeTag($index)">remove</button>
          </div>
        }
        <button type="button" (click)="addTag()">add tag</button>
      </fieldset>

      <p>status: <code>{{ form.status }}</code></p>
      <button type="submit" [disabled]="form.invalid || form.pending">submit</button>
      @if (submitted()) {
        <pre class="ok">{{ submitted() }}</pre>
      }
    </form>
  `,
  styles: [
    `
      form {
        display: grid;
        gap: 0.75rem;
        max-width: 32rem;
      }
      label {
        display: grid;
        gap: 0.25rem;
      }
      input {
        padding: 0.4rem;
        border: 1px solid #b0bec5;
        border-radius: 4px;
      }
      .err {
        color: #c62828;
        font-style: normal;
        font-size: 0.85rem;
      }
      .hint {
        color: #1976d2;
        font-style: normal;
        font-size: 0.85rem;
      }
      .ok {
        background: #e8f5e9;
        padding: 0.5rem;
        border-radius: 4px;
        white-space: pre-wrap;
      }
      fieldset {
        border: 1px solid #cfd8dc;
        border-radius: 4px;
        padding: 0.5rem 0.75rem;
      }
      .tag-row {
        display: flex;
        gap: 0.4rem;
        margin: 0.25rem 0;
      }
    `,
  ],
})
export class ReactiveFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    username: this.fb.nonNullable.control('', {
      validators: [Validators.required, forbiddenNameValidator(['banned', 'spam'])],
      asyncValidators: [uniqueUsernameValidator()],
      updateOn: 'change',
    }),
    email: this.fb.nonNullable.control('', [Validators.email]),
    tags: this.fb.nonNullable.array<string>([]),
  });

  readonly submitted = signal('');

  get tags() {
    return this.form.controls.tags;
  }

  addTag() {
    this.tags.push(this.fb.nonNullable.control(''));
  }

  removeTag(i: number) {
    this.tags.removeAt(i);
  }

  submit() {
    if (this.form.invalid) return;
    this.submitted.set(JSON.stringify(this.form.getRawValue(), null, 2));
  }
}
