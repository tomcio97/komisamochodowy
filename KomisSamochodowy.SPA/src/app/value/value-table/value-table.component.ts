import { Component, OnInit, Input } from '@angular/core';
import { Value } from 'src/app/_models/Value';
import { ValueService } from 'src/app/_services/value.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.css']
})
export class ValueTableComponent implements OnInit {

  @Input() values: Value[];
  showSpinner = false;

  constructor(private service: ValueService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  deleteValue(id: number)
{
  this.alertify.confirm('Czy napewno chcesz usunąc samochód?', ()=>
  {
    this.showSpinner = true;
    this.service.deleteValue(id).subscribe(() => {
      this.showSpinner = false;
      this.alertify.success('Usunięto samochód');
      this.values.splice(this.values.findIndex(v => v.id === id), 1);
    }, error => {
      this.showSpinner = false;
      this.alertify.error('Nie udało się usunąć');
    });
  });
}

}
