import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private _category:CategoryService,private _route:Router){}
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

  DeleteButtonClick(event:any,category:any){
    console.log("Delete button clicked");
    console.log(category)
    // call the delete endpoint
    this._category.deleteCategory(category).subscribe(
      (data:any)=>{
        // success
        Swal.fire("Successfully Deleted !!","Category got deleted...","success");
        // after deleting category updating the categories
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
      },
      (error:any)=>{
        // error
        Swal.fire("Error !!","error in deleting data","error");
      }
    )
    
  }

  updateButtonClicked(event:any,category:any){
    // setting the category to be updated to the local storage
    localStorage.setItem("updateCategory",JSON.stringify(category));
    console.log(category);
    // navigating to the update-category
    this._route.navigate(["/admin/update-category"])


  }
}
