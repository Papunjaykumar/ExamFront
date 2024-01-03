import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private _category:CategoryService){}
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        // success
        this.categories=data;
        console.log(this.categories);
        
      },
      (error)=>{
        // error
        Swal.fire("Error !!","error in loading data","error");
      }
    )
  }
  categories=null;
}
