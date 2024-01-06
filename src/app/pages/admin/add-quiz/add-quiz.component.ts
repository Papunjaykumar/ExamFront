import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  categories=null;

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfquestion:'',
    active:'',
    category:null
  }

  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService){}
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        // success
        this.categories=data;
        console.log(this.categories);
        
      },
      (error:any)=>{
        // error
        console.log(error);
        Swal.fire("Error !!","error in loading data from server","error");
        
      }
    )
  }
  // add quiz
  addQuiz(){
    console.log(this.quizData);
    // validation for title
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this._snack.open("Title required !!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
    // validation for category 
    if(this.quizData.category==null){
      this._snack.open("Please select the Category !!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
    // you can add the validation if required

    // call the server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        // success
        Swal.fire("Successfully Done !!","Quiz is addedd","success");
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfquestion:'',
          active:'',
          category:null
        };

      },
      (error:any)=>{
        // error
        console.log(error);
        Swal.fire("Error !!","Error while adding quiz...","error");
        
      }
    
    )

    
  }
  
}
