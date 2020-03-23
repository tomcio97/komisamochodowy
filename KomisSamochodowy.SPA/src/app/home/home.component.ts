import { Component, OnInit } from '@angular/core';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  token = localStorage.getItem('token');
  formIsOnly = false;

  ngOnInit() {
  }

  isToken()
  {
    return this.authService.loggedIn();
  }

  showForm()
  {
    this.formIsOnly = true;
  }

  closeForm()
  {
    if (this.isToken)
    {
      this.formIsOnly = false;
    }
  }

}
