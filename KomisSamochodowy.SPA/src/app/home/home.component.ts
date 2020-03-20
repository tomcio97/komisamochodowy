import { Component, OnInit } from '@angular/core';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  token = localStorage.getItem('token');
  formIsOnly = false;

  ngOnInit() {
  }

  isToken()
  {
    return !!this.token;
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
