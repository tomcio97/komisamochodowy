import { Component, OnInit } from '@angular/core';
import { ValueService } from 'src/app/_services/value.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Value } from 'src/app/_models/Value';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/Photo';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value-add',
  templateUrl: './value-add.component.html',
  styleUrls: ['./value-add.component.css']
})
export class ValueAddComponent implements OnInit {

  value: Value;
  valueForm: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiUrl;

  constructor(private service: ValueService, private alertify: AlertifyService, private router: Router, private http: HttpClient) { }


  ngOnInit() {
    this.valueForm = new FormGroup({
      mark: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      engineCapacity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      fuelType: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      numberOfDoors: new FormControl('', Validators.required),
      mileage: new FormControl('', Validators.required),
      describe: new FormControl(''),
      file: new FormControl('', Validators.required)
    });

    //this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader()
  {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'values/photo',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.valueForm.get('file').setValue(file);
    }
  }

addValue()
{
  if (this.valueForm.valid)
  {
  const formData = new FormData();
  formData.append('mark', this.valueForm.get('mark').value);
  formData.append('model', this.valueForm.get('model').value);
  formData.append('year', this.valueForm.get('year').value);
  formData.append('engineCapacity', this.valueForm.get('engineCapacity').value);
  formData.append('price', this.valueForm.get('price').value);
  formData.append('fuelType', this.valueForm.get('fuelType').value);
  formData.append('color', this.valueForm.get('color').value);
  formData.append('numberOfDoors', this.valueForm.get('numberOfDoors').value);
  formData.append('mileage', this.valueForm.get('mileage').value);
  formData.append('describe', this.valueForm.get('describe').value);
  formData.append('file', this.valueForm.get('file').value);

  this.service.addValue(formData).subscribe( ()=>{
    this.alertify.success('Pomyślnie dodano');
    this.router.navigate(['paneladministracyjny']);
  }, error => {
      this.alertify.error('Nie udało się dodać');
    });
}
}
}
