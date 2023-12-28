import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  public user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }
  
  formSubmit()
  {
    console.log(this.user)
    if(this.user.userName==''||this.user.userName==null){
      alert("User is required !!")
      return
    }
  }
}
