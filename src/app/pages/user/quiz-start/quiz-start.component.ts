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
  timer:any;
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

        this.timer=this.questions.length*2*60;

        
        console.log(this.questions);
        this.startTime();
        
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
        this.evalQuiz();
                
      }

      
    })
  }

  startTime(){
    let t=window.setInterval(()=>{
      // code
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;

    return `${mm} min : ${ss} sec`
  }

  evalQuiz(){
    
    // call to server to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        // success
        console.log(data);
        this.marksGot=(data.marksGot).toFixed(2);
        this.attemted=data.attempted;
        this.correctAnswers=data.correctAnswer
        
      },
      (error:any)=>{
        console.log(error);
        
      }
    )

    this.isSubmit=true;
    //     this.questions.forEach((q:any)=>{
    //       if(q.givenAnswer==q.ans){
    //         // this.attemted++;
    //         this.correctAnswers++;
    //         let marksSingle=(q.quiz.maxMarks)/this.questions.length;
    //         this.marksGot+=marksSingle;
    //       }
    //       if(q.givenAnswer.trim()!=''){
    //         this.attemted++;
    //       }
    //     });
  }

  print(){
    window.print();
  }
}
