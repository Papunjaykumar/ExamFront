import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
  
  qId:any;
  qtitle:any;
  questions:any;
  constructor(private _route:ActivatedRoute,private _question:QuestionService){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;
    this.qtitle=this._route.snapshot.params.title;
    console.log(this.qId+" "+this.qtitle);

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
        console.log(this.questions);
        
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error !!","Server error while loading data from the server...","error")
        
      }
    );
    
  }

  // delete question 
  deleteQuestion(quesId:any){
    // alert(quesId+" Delete button clicked")
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:"Are you sure,want to delete this question?"
    }).then((result:any)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(quesId).subscribe(
          (data:any)=>{
            // success 
            this.questions=this.questions.filter((q:any)=>q.quesID!=quesId)
            Swal.fire("Successfully Done !!","Question got deleted...","success");
          },
          (error:any)=>{
            console.log(error);
            Swal.fire("Error !!","server error ...","error");
            
          }
        )
      }
    })
  }

}
