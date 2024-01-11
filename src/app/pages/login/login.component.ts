import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router){}

  loginData={
    userName:"",
    password:""
  }

  formSubmit(){
    console.log(this.loginData);
    if(this.loginData.userName.trim()=="" || this.loginData.userName==null){
        this.snack.open("Username is required !!",'',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'right'
        });
        return;
    }
    if(this.loginData.password.trim()=="" || this.loginData.password==null){
      this.snack.open("Password is required !!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
  }
  // request server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success")
        console.log(data);

        // login..
        // save the token 
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            // redirect ...ADMIN  admin_dashbooard
            // redirect ...NORMAL normal_dashboard
            if(this.login.getUserRole()=="ADMIN"){
              // admin dashboard
              // window.location.href='/admin'
              this.router.navigate(['admin'])
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=='NORMAL'){
              // normal user dashboard
              // window.location.href='user-dashboard'
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
              
            }
            

            
          },
          (error)=>{
            console.log("Papunjay");
            
            console.log(error);
            this.snack.open("Somthing went wrong !!",'',{
              duration:3000,
              verticalPosition:'top',
              horizontalPosition:'right',
            });
            
            
          }
        );
        
      },
      (error)=>{
        console.log("Failure !!");
        
        console.log(error);
        this.snack.open("Invalid Details !! Try Agains",'',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'right',
        });
        
      }
    )
  }
}
