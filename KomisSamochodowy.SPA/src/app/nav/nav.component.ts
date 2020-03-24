import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
// login()
// {
//  this.authService.login(this.model).subscribe(next =>
//   {
//     console.log('Zalogowałeś sie pomyślnie');
//   }, error => 
//   {
//     console.log('Wystąpił błąd');
//   });
// }

loggedIn()
{
  return this.authService.loggedIn();
}

logout()
{
  localStorage.removeItem('token');
  this.alertify.message('Zostałeś wylogowany');
  this.router.navigate(['./home']);
}

}
