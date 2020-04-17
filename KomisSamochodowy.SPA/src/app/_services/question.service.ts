import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../_models/Question';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getQuestions(): Observable<Question[]>
{
  return this.http.get<Question[]>(this.baseUrl + 'values/' + 'questions');
}

addQuestion(valueId: number, model: any){
 return this.http.post(this.baseUrl + 'values/' + valueId + '/question', model);
}

removeQuestion(valueId: number, id: number)
{
  return this.http.delete(this.baseUrl + 'values/' + valueId + '/question/' + id);
}

}

