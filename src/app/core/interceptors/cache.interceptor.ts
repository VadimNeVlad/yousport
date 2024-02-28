import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event);
        }
      })
    );
  }

  invalidateCache() {
    this.cache.clear();
  }

  refetchData() {}
}
