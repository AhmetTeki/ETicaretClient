import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.info(
              'Bu işlemi yapmaya yetkiniz bulunmamaktadır'
            );
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.info('Sunucuya erişilmiyor');
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.info('Geçersiz istek yapıldı');
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.info('Sayfa bulunamadı');
            break;
          default:
            this.toastrService.info('Beklenmeyen bir hata meydana geldi');
            break;
        }
        return of(error);
      })
    );
  }
}
