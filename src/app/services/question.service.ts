import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }
// getting all the questions
  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }
// adding the questions by the admin
public addQuestion(question:any){
  return this._http.post(`${baseUrl}/question/`,question);
}

// delete question with the given question id
public deleteQuestion(quesId:any){
  return this._http.delete(`${baseUrl}/question/${quesId}`)
}

// getting questions of quiz for test
public getQuestionsOfQuizForTest(qid:any){
  return this._http.get(`${baseUrl}/question/quiz/${qid}`)
} 

// eval quiz
public evalQuiz(questions:any){

  return this._http.post(`${baseUrl}/question/eval-quiz`,questions)
}

}
