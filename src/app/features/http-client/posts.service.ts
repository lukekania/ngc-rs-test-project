import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../di-pipes-directives/tokens/app-config.token';

export interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  list(limit = 5): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.config.apiBase}/posts`, {
      params: { _limit: limit.toString() },
    });
  }
}
