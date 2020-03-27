import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Value } from 'src/app/_models/Value';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { NgForm } from '@angular/forms';
import { ValueService } from 'src/app/_services/value.service';

@Component({
  selector: 'app-value-edit',
  templateUrl: './value-edit.component.html',
  styleUrls: ['./value-edit.component.css']
})
export class ValueEditComponent implements OnInit {

  value: Value;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['event'])
  unloadNotification($event: any){
    if(this.editForm.dirty)
    {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private service: ValueService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data =>
      {
        this.value = data.value;
      });
    }

    updateValue(){
      this.service.updateValue(this.value.id, this.value).subscribe(next =>{
        this.alertify.success('Pomyślnie zaktualizowano');
        this.editForm.reset(this.value);
        this.router.navigate(['paneladministracyjny']);
      }, error =>
      {
        this.alertify.error('Błąd zapisu');
      });
    }
}
