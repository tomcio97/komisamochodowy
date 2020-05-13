import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Value } from 'src/app/_models/Value';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { NgForm } from '@angular/forms';
import { ValueService } from 'src/app/_services/value.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/_models/Photo';
import { __values } from 'tslib';


@Component({
  selector: 'app-value-edit',
  templateUrl: './value-edit.component.html',
  styleUrls: ['./value-edit.component.css']
})
export class ValueEditComponent implements OnInit {

  value: Value;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;
  showSpinner = false;

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

    this.initializeUploader();
    }

    updateValue(){
      this.showSpinner = true;
      this.service.updateValue(this.value.id, this.value).subscribe(next =>{
        this.alertify.success('Pomyślnie zaktualizowano');
        this.editForm.reset(this.value);
        this.router.navigate(['paneladministracyjny']);
        this.showSpinner = false;
      }, error =>
      {
        this.alertify.error('Błąd zapisu');
        this.showSpinner = false;
      });
    }

    public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }

    initializeUploader()
    {
      this.uploader = new FileUploader({
        url: this.baseUrl + 'values/' + this.value.id + '/photos',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024,
      });

      this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

      this.uploader.onSuccessItem = (item, response, status, headers) =>
      {
        if(response)
        {
          const res: Photo = JSON.parse(response);
          const photo = {
            id: res.id,
            url: res.url,
            isMain: res.isMain,
          };
          this.value.photos.push(photo);
        }
      };
    }

    setMain(photo: Photo)
    {
      this.showSpinner = true;
      this.service.setMain(this.value.id, photo.id).subscribe(() =>{
        this.currentMainPhoto = this.value.photos.filter(p => p.isMain === true)[0];
        this.currentMainPhoto.isMain = false;
        photo.isMain = true;
        this.showSpinner = false;
        this.alertify.success('Zmieniono zdjęcie głowne');
      },error =>{
        this.showSpinner = false;
        this.alertify.error('Zdjęcie główne nie zostało zmienione');
      });
    }

    deletePhoto(id: number)
    {
      this.alertify.confirm('Czy chcesz usunąc zdjęcie ?', ()=>{
        this.service.deletePhoto(this.value.id, id).subscribe(()=>{
          this.value.photos.splice(this.value.photos.findIndex(p => p.id === id), 1);
          this.alertify.success('Zdjęcie zostało usunięte');
        }, error =>{
          this.alertify.error('Nie udało sie usunąć zdjęcia');
        });
      });
    }
}
