import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { FeaturePageComponent } from '../../shared/feature-page/feature-page.component';
import { Post, PostsService } from './posts.service';

interface LoadState {
  status: 'idle' | 'loading' | 'ok' | 'error';
  posts: Post[];
  error?: string;
}

const LOADING: LoadState = { status: 'loading', posts: [] };

@Component({
  selector: 'app-http-client',
  imports: [AsyncPipe, FeaturePageComponent],
  template: `
    <app-feature-page
      title="HttpClient & Interceptors"
      groupLabel="HTTP & Async"
      description="HttpClient with three functional interceptors: auth header, request timing, error normalization."
      [notesOpen]="true"
    >
      <ng-container ngProjectAs="[notes]">
        <p>
          The auth interceptor adds an <code>X-Demo-Token</code> header (visible in DevTools
          Network). The logging interceptor writes request timing to <code>console.debug</code>.
          The error interceptor catches <code>HttpErrorResponse</code> and re-throws a normalized
          <code>Error</code> with a user-friendly message.
        </p>
        <p>
          The view subscribes via the <code>async</code> pipe with a <code>startWith</code> sentinel
          for the loading state, plus <code>catchError</code> for graceful failure rendering.
        </p>
      </ng-container>

      <button (click)="reload()">{{ state$ ? 'reload' : 'load posts' }}</button>

      @if (state$ | async; as s) {
        @switch (s.status) {
          @case ('loading') {
            <p>loading…</p>
          }
          @case ('error') {
            <p class="err">{{ s.error }}</p>
          }
          @case ('ok') {
            <ul class="posts">
              @for (post of s.posts; track post.id) {
                <li>
                  <h3>{{ post.title }}</h3>
                  <p>{{ post.body }}</p>
                </li>
              }
            </ul>
          }
        }
      }
    </app-feature-page>
  `,
  styles: [
    `
      .posts {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0;
        display: grid;
        gap: 0.75rem;
      }
      .posts li {
        background: #f5f5f5;
        padding: 0.75rem;
        border-radius: 4px;
      }
      .posts h3 {
        margin: 0 0 0.25rem;
        font-size: 0.95rem;
      }
      .posts p {
        margin: 0;
        color: #455a64;
      }
      .err {
        color: #c62828;
      }
    `,
  ],
})
export class HttpClientComponent {
  private readonly posts = inject(PostsService);
  protected state$: Observable<LoadState> | null = null;

  reload() {
    this.state$ = this.posts.list(5).pipe(
      map<Post[], LoadState>((posts) => ({ status: 'ok', posts })),
      startWith(LOADING),
      catchError((err: Error) =>
        of<LoadState>({ status: 'error', posts: [], error: err.message }),
      ),
    );
  }
}
