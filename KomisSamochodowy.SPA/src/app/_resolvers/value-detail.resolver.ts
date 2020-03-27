import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Value } from '../_models/Value';
import { ValueService } from '../_services/value.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ValueDetailResolver implements Resolve<Value>
{
    constructor(private service: ValueService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Value> {
        return this.service.getValue(route.params.id).pipe(catchError(error => {
            this.alertify.error('Problem z pobraniem danych');
            console.error('Problem z pobraniem danych');
            this.router.navigate(['']);
            return of(null);
        }
        ));
    }
}