import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any=null;
  constructor(private login:LoginService){}
  ngOnInit(): void {
    // getting the user from the localStorge
    this.user=this.login.getUser();
    // getting the user from the server
    // this.user=this.login.getCurrentUser().subscribe(
    //   (user:any)=>{
    //     this.user=user;
    //   },
    //   (error)=>{
    //     console.log(error);
        
    //   }
    // )

  }
  

}
