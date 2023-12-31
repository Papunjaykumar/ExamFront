import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // event
  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }

  // generate token
  public generateToken(loginData:any){

    // request backend servie

    return this.http.post(`${baseUrl}/generate-token`,loginData)
  }

  // loginUser :set the token in local storage
  public loginUser(token:any){
    localStorage.setItem("token",token);
    
    return true;
  }

  // islogin :user is login or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
    console.log(tokenStr);
    if(tokenStr==undefined || tokenStr=="" || tokenStr==null){
      return false;
    }

    return true;
    
  }

  // logout : remove token from localStorage

  public logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return true;
  }

  // getToken : return the token
  public getToken(){
    return localStorage.getItem("token");
  }
  
  // set userDetail
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  // get user
  public getUser(){
    let usrStr=localStorage.getItem("user");
    if(usrStr!=null){
      return JSON.parse(usrStr);
    }
    // if not login then logout it
    this.logout();
    return null;

  }

  // get the user role
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }

  // current user : which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }
}
