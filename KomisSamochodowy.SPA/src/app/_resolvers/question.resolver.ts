import { Question } from '../_models/Question';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { QuestionService } from '../_services/question.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class QuestionResolver implements Resolve<Question[]>
{
    constructor(private service: QuestionService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Question[]> {
        return this.service.getQuestions().pipe(catchError(error => {
            this.alertify.error('Problem z pobraniem zapytań');
            //console.error('Problem z pobraniem danych');
            this.router.navigate(['']);
            return of(null);
        })
        );
    }
}