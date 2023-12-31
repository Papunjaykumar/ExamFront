import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class adminGuard implements CanActivate {
  constructor(private login:LoginService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(this.login.isLoggedIn() && this.login.getUserRole()=='ADMIN'){
      return true;
    }
    // navigate to login page
    this.router.navigate(['login']);
    return false;
    
  }

}