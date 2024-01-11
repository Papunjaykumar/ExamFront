import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories:any;
  constructor(private _cat:CategoryService){}
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        // success
        this.categories=data;
        console.log(this.categories);
        
      },
      (error:any)=>{
        // error
        console.log(error);
        Swal.fire("Error !!","server error in loading data...","error");
        
      }
    )
  }

}
