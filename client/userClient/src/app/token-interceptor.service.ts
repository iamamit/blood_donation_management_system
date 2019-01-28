import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor() { }

  intercept(req,next)
  {
    let tokenizedreq=req.clone({
      setHeaders:{
        Athorization:'Bearer xx.yy.zz'
      }
    })

    return next.handle(tokenizedreq);
  }
}
