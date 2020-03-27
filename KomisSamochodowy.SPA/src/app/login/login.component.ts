import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Value } from '../_models/Value';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  values: Value[];
  formIsOnly = false;
  constructor(private authService: AuthService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.values = data.values;
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

}
