import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _category:CategoryService,private _snack:MatSnackBar,private _router:Router){}
  qId=undefined;
  quiz:any;
  categories:any
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        // success
        this.categories=data;
      },
      (error:any)=>{
        // error
        Swal.fire("Error !!","Error in loading the data from the server","error");
      }
     );
     
     
    this.qId=this._route.snapshot.params.qid;
    this._quiz.getSingleQuiz(this.qId).subscribe(
      (data:any)=>{
        // success
        this.quiz=data
        console.log(this.quiz);
        
      },
      (error:any)=>{
        // error
        console.log(error);
        
        Swal.fire("Error !!","Server error in loading data...","error");
      }
    );
  }

  // update form submit
  public updateData(){
    // validate the data
    // validation for title
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this._snack.open("Title required !!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
    // validation for category 
    if(this.quiz.category==null){
      this._snack.open("Please select the Category !!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }


    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Successfully Done !!","Quiz updated...","success").then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error:any)=>{
        // error
        console.log(error);
        Swal.fire("Error !!","Server Error...","error");
        
      }
    )
  }


}
