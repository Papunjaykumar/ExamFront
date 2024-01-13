import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId:any;
  quiz:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;
    // console.log(this.qId);

    this._quiz.getSingleQuiz(this.qId).subscribe(
      (data:any)=>{
        // success
        this.quiz=data;
        console.log(this.quiz);
        
        
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading data from the server...","error");
        
      }
    )
    
      
      
  }

  // start quiz
  public startQuiz(){
    Swal.fire({
      title:'Do you want to ',
      showDenyButton:true,
      confirmButtonText:'Start',
      denyButtonText:'Cancel',
      icon:'info'
    }).then((result:any)=>{
      if(result.isConfirmed){
        this._router.navigate(['/quiz-start/'+this.qId])
        
      }else if(result.isDenied){
        console.log("Quiz cancled");
        
      }
    })
  }

}
