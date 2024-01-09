import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public Editor = ClassicEditor;
  qId:any;
  qtitle:any;
  question={
    quiz:{
      qid:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    ans:''
  }
  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;
    this.qtitle=this._route.snapshot.params.title;
    console.log(this.qId+" "+this.qtitle);
    this.question.quiz['qid']=this.qId
    
  }

  public addQuestionFromSubmit(){
    console.log("Question add button click");

    // validations
    if(this.question.content.trim()=='' || this.question.content==null){
        this._snack.open("Content is Required",'',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'right'
        });
        return;
    }

    if(this.question.option1.trim()=='' || this.question.option1==null){
      this._snack.open("Option1 is Required",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }

    if(this.question.option2.trim()=='' || this.question.option2==null){
      this._snack.open("Option2 is Required",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
    if(this.question.ans.trim()=='' || this.question.ans==null){
      this._snack.open("Please select the answer !!",'',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
    // submitting the from
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        // success
        Swal.fire("Successfully Done !!","Question added to the quiz"+this.qtitle,"success");
        this.question.content='',
        this.question.option1='',
        this.question.option2='',
        this.question.option3='',
        this.question.option4='',
        this.question.ans=''
      },
      (error:any)=>{
        // error
        console.log(error);
        Swal.fire("Error !!","Server error while adding Questions","error");
        
      }
    )
  }

}
