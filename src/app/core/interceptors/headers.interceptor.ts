import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const _platId = inject(PLATFORM_ID);

  if (isPlatformBrowser(_platId)) {
    if (localStorage.getItem('userToken') !== null) {
      req = req.clone({
        setHeaders: { token: localStorage.getItem('userToken')! },
      });
    }
  }

  return next(req);
};
