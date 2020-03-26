import { Component, OnInit } from '@angular/core';
import { ValueService } from 'src/app/_services/value.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Value } from 'src/app/_models/Value';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-value-detail',
  templateUrl: './value-detail.component.html',
  styleUrls: ['./value-detail.component.css']
})
export class ValueDetailComponent implements OnInit {

  value: Value;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private service: ValueService, private alertify: AlertifyService, private route: ActivatedRoute) { }

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



}
