import { Component, signal } from '@angular/core';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';
import { ReactiveFormComponent } from './reactive-form.component';
import { TemplateFormComponent } from './template-form.component';

@Component({
  selector: 'app-forms-demo',
  imports: [FeaturePageComponent, ReactiveFormComponent, TemplateFormComponent],
  template: `
    <app-feature-page
      title="Forms"
      groupLabel="Forms"
      description="Reactive Forms with FormBuilder, FormArray, sync + async validators — plus a template-driven contrast."
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          The reactive form uses <code>FormBuilder.nonNullable</code> with a typed
          <code>FormGroup</code> containing a <code>FormArray</code> of tags, the synchronous
          <code>forbiddenNameValidator</code>, and the async <code>uniqueUsernameValidator</code>
          that simulates a backend check (try <code>admin</code>, <code>root</code>, or
          <code>angular</code>). The async validator runs only when the user changes the field, so
          first-render output is deterministic.
        </p>
        <p>
          The template-driven form uses <code>[(ngModel)]</code> two-way binding with built-in
          validators applied via element attributes — useful for very simple forms.
        </p>
      </ng-container>

      <div class="tabs">
        <button
          [class.active]="tab() === 'reactive'"
          (click)="tab.set('reactive')"
        >Reactive</button>
        <button
          [class.active]="tab() === 'template'"
          (click)="tab.set('template')"
        >Template-driven</button>
      </div>

      @if (tab() === 'reactive') {
        <app-reactive-form />
      } @else {
        <app-template-form />
      }
    </app-feature-page>
  `,
  styles: [
    `
      .tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .tabs button {
        padding: 0.4rem 0.75rem;
        background: #eceff1;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
      }
      .tabs button.active {
        background: #fff;
        border-color: #607d8b;
      }
    `,
  ],
})
export class FormsDemoComponent {
  readonly tab = signal<'reactive' | 'template'>('reactive');
}
