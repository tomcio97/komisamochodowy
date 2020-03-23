import { Component, OnInit } from '@angular/core';
import { Value } from 'src/app/_models/Value';
import { HttpClient } from '@angular/common/http';
import { ValueService } from 'src/app/_services/value.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.component.html',
  styleUrls: ['./value-list.component.css']
})
export class ValueListComponent implements OnInit {

  values: Value[];
  id: any;
  value: any;

  constructor(private htpp: HttpClient, private service: ValueService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.getValues();
  }

  getValues()
  {
    this.service.getValues().subscribe((values: Value[]) => {
      this.values = values;
    }, error =>
    {
      this.alertifyService.error(error);
    });
  }

}
