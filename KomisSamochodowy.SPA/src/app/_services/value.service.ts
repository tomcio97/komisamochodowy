import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Value } from '../_models/Value';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ValueService {

baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {}

getValues(): Observable<Value[]>
{
return this.http.get<Value[]>(this.baseUrl + 'values/');
}

getValue(id: number): Observable<Value>
{
  return this.http.get<Value>(this.baseUrl + 'values/' + id);
}

updateValue(id: number, value: Value)
{
  return this.http.put(this.baseUrl + 'values/' + id, value);
}

setMain(valueId: number, id: number)
{
  return this.http.post(this.baseUrl + 'values/' + valueId + '/photos/' + id + '/setMain', {});
}

}
