import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-Value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;

  constructor(private htpp: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues()
  {
    this.htpp.get('http://localhost:5000/api/values').subscribe(res => {
      this.values = res;
    }, error => {
      console.log(error);
    });
  }

}
