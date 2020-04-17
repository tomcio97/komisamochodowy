import { Component, OnInit, ViewChild } from '@angular/core';
import { ValueService } from 'src/app/_services/value.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Value } from 'src/app/_models/Value';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { QuestionService } from 'src/app/_services/question.service';
import { Question } from 'src/app/_models/Question';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-value-detail',
  templateUrl: './value-detail.component.html',
  styleUrls: ['./value-detail.component.css']
})
export class ValueDetailComponent implements OnInit {

  value: Value;
  model: any = {};
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;

  constructor(private service: ValueService, private alertify: AlertifyService, private route: ActivatedRoute, private questionService:QuestionService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.value = data.value;
      });

    this.galleryOptions = [
        {
          width: '500px',
          height: '400px',
          thumbnailsColumns: 4,
          imagePercent: 100,
          imageAnimation: NgxGalleryAnimation.Slide
        }
    ];
    this.galleryImages = this.getImages();
  }

  getImages()
  {
    const imagesUrl = [];

    for(let i = 0; i < this.value.photos.length; i++)
    {
      imagesUrl.push({
          small: this.value.photos[i].url,
          medium: this.value.photos[i].url,
          big: this.value.photos[i].url,
      });
    }

    return imagesUrl;
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  addQuestion()
  {
    this.questionService.addQuestion(this.value.id, this.model).subscribe(next => {
        this.alertify.success('Zapytanie zostało wysłane. Spodziewaj się odpowiedzi na mail\'u który podałeś');
        this.selectTab(0);
    }, error => {
      this.alertify.error('Dodawanie zapytania nie powiodło się');
      console.log(error);
    });
  }


}
