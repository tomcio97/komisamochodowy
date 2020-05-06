import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Router } from '@angular/router';
import { ValueService } from '../_services/value.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  searchText;
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router, private valueService: ValueService) { }

  ngOnInit() {
  }

loggedIn()
{
  return this.authService.loggedIn();
}

logout()
{
  localStorage.removeItem('token');
  this.alertify.message('Zostałeś wylogowany');
  this.router.navigate(['']);
}


setSearchText(text)
{
  this.valueService.changeBehaviorSubject(text);
  this.router.navigate(['']);
}

resetSearchText()
{
  this.valueService.changeBehaviorSubject('');
}
}
