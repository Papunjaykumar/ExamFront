import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userSerice:UserService,private snack: MatSnackBar){}
  
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
      // alert("User is required !!")
      this.snack.open("Username is required !!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }

    // adduser
    this.userSerice.addUser(this.user).subscribe(
      (data:any)=>{
        // success
        console.log(data);
        Swal.fire('Successfully done !!','User  Id is '+data.id,'success')
        
      },
      (error)=>{
        // error
        console.log(error);
        // alert("Something went wrong")
        this.snack.open(error.error.message,'',{
          duration:3000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
        
      }
    )

  }
}
