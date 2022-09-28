import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly toastrService: ToastrService,
    private readonly injector: Injector,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response && (event.body.error || !event.ok)) {
          const translateService = this.injector.get(TranslateService);
          translateService.get('errors.not-found').subscribe((translatedErrorText) => {
            this.toastrService.error(translatedErrorText);
          });
          this.router.navigate(['/']);
        }
        return event;
      }),
      catchError((error) => {
        this.router.navigate(['/']);
        const translateService = this.injector.get(TranslateService);
        translateService.get('errors.occurred').subscribe((translatedErrorText) => {
          this.toastrService.error(translatedErrorText);
        });
        return of(error);
      }),
    );
  }
}
