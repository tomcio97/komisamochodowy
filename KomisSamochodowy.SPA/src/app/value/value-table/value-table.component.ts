import { Component, OnInit, Input } from '@angular/core';
import { Value } from 'src/app/_models/Value';

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.css']
})
export class ValueTableComponent implements OnInit {

  @Input() values: Value;

  constructor() { }

  ngOnInit() {
  }

}
