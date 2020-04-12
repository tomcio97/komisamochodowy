import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Value } from '../_models/Value';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from '../_models/pagination';
import { ValueService } from '../_services/value.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  values: Value[];
  formIsOnly = false;
  pagination: Pagination;

  constructor(private authService: AuthService, private alertify: AlertifyService, private route: ActivatedRoute, private service:ValueService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.values = data.values.result;
      this.pagination = data.values.pagination;
    });
  }
login()
{
 this.authService.login(this.model).subscribe(next =>
  {
    this.alertify.success('Zalogowałeś sie pomyślnie');
    this.formIsOnly = false;
  }, error => 
  {
    this.alertify.error('Wystąpił błąd');
  });
}

loggedIn()
{
  return this.authService.loggedIn();
}

logout()
{
  localStorage.removeItem('token');
  //this.alertify.message('Zostałeś wylogowany');
}

showForm()
{
  this.formIsOnly = true;
}

pageChanged(event: any): void {
  this.pagination.currentPage = event.page;
  this.getValues();
}
getValues()
{
  this.service.getValues(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((res: PaginationResult<Value[]>) => {
    this.values = res.result;
    this.pagination = res.pagination;
  }, error =>
  {
    this.alertify.error(error);
  });
}

}
