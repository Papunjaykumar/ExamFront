import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
  constructor(private _category:CategoryService,private _route:Router){}
  ngOnInit(): void {
    let updateCategoryStr=localStorage.getItem("updateCategory");
    if(updateCategoryStr!=null){
      this.updateCategory=JSON.parse(updateCategoryStr);
    }
    
  }

  updateCategory={
    cid:'',
    title:'',
    description:''
  };


  formSubmit(){
    // alert("update form click")
    console.log(this.updateCategory)
    this._category.updateCategory(this.updateCategory).subscribe(
      (data:any)=>{
        Swal.fire("Successfully Done !!","Category with id :"+this.updateCategory.cid+" has been updated","success");
        // after updating the quiz you have to clear the update CAtegroy from the localstorage
        localStorage.removeItem("updateCategory");
        // navigating to the view Category page
        this._route.navigate(["/admin/categories"])

      },
      (error:any)=>{
        Swal.fire("Error !!","Server Error...","error")
      }
    )
  }


}
