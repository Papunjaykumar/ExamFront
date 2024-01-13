import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit{
  qId:any;
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attemted=0;
  isSubmit=false;
  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService

  ){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qId=this._route.snapshot.params.qid;
    console.log(this.qId);
    this.loadQuestions();
    
    
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        this.questions.forEach((q:any) => {
          q['givenAnswer']='';
        });
        console.log(this.questions);
        
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error !!","Error in loading questions from the server","error");
        
      }
    )
  }

  preventBackButton(){
    history.pushState(null,'');
    this.locationSt.onPopState(()=>{
      history.pushState(null,'')
    })
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz?',
      confirmButtonText:'Submit',
      denyButtonText:'No',
      showDenyButton:true,
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        // calculations
        // console.log(this.questions);
        this.isSubmit=true;
        this.questions.forEach((q:any)=>{
          if(q.givenAnswer==q.ans){
            // this.attemted++;
            this.correctAnswers++;
            let marksSingle=(q.quiz.maxMarks)/this.questions.length;
            this.marksGot+=marksSingle;
          }
          if(q.givenAnswer.trim()!=''){
            this.attemted++;
          }
        })

        
        
        
        
        

        
      }

      
    })
  }
}
