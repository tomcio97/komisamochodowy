import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {}

sendMail(mail: any)
{
  return this.http.post(this.baseUrl + 'emails', mail);
}

}
