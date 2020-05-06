import { Component, OnInit, Input } from '@angular/core';
import { Value } from 'src/app/_models/Value';
import { HttpClient } from '@angular/common/http';
import { ValueService } from 'src/app/_services/value.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginationResult } from 'src/app/_models/pagination';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-value-list',
  templateUrl: './value-list.component.html',
  styleUrls: ['./value-list.component.css']
})
export class ValueListComponent implements OnInit {

  values: Value[];
  pagination: Pagination;
  valueParams: any = {};
  searchText: string;

  constructor(private alertifyService: AlertifyService, private route: ActivatedRoute, private service: ValueService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
    this.values = data.values.result;
    this.pagination = data.values.pagination;
    });
    this.valueParams.orderBy = 'recent';
    this.service.currentBehaviorSubject.subscribe(value => this.searchText = value);

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getValues();
  }
  getValues()
  {
    // tslint:disable-next-line: max-line-length
    this.service.getValues(this.pagination.currentPage, this.pagination.itemsPerPage, this.valueParams.mark, this.valueParams.model, this.valueParams.year, this.valueParams.engineCapacity, this.valueParams.priceFrom, this.valueParams.priceTo, this.valueParams.orderBy)
    .subscribe((res: PaginationResult<Value[]>) => {
      this.values = res.result;
      this.pagination = res.pagination;
    }, error =>
    {
      this.alertifyService.error('Wystąpił błąd');
    });
  }

  sort()
  {
    if(this.valueParams.orderBy === 'price')
    {
      this.getValues();
    }
  }

}
