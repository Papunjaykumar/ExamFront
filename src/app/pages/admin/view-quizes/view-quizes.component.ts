import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quizzes:any;

  constructor(private _quiz:QuizService){}
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading data from server","error");
        
      }
    )
  }

  // delete quiz
  deleteQuiz(qid:any){
    Swal.fire({
      icon:'info',
      title:"Are you sure ?",
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result:any)=>{
      if(result.isConfirmed){
        // delete
        this._quiz.deleteQuiz(qid).subscribe(
          (data:any)=>{
            
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qid!=qid);
            
            Swal.fire("Successfully Done !!","Quiz Deleted...","success");
          },
          (error)=>{
            console.log(error);
            Swal.fire("Error !!","Error in deleting quiz","error");
            
          }
        )
      }
    })
    
  }

}
