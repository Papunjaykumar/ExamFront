import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quizzes=null;

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

}
