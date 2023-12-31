import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add the jwt token (localStorage) request
        let authReq=req;
        const token=this.login.getToken();
        console.log("Inside Interceptor");
        

        // add the token to the request
        if(token!=null){
            authReq=authReq.clone({setHeaders:{'Authorization':`Bearer ${token}`}});
        }
        console.log(authReq)
        return next.handle(authReq)
    }

}

export const authInterceptorProviders : Provider=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    }
]