import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  images: Array<string>;

  constructor(private _http: HttpClient) { }

  ngOnInit(){
    // this._http.get('https://picsum.photos/list')
    // .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
    // .subscribe(images => this.images = images);

    this.images = ['../../assets/img/slider/slider1.jpg', '../../assets/img/slider/slider2.jpg',
    '../../assets/img/slider/slider3.jpg','../../assets/img/slider/slider4.jpg']

  }   
  // private _randomImageUrls(images: Array<{id: number}>): Array<string> {
  //   return [1, 2, 3].map(() => {
  //     const randomId = images[Math.floor(Math.random() * images.length)].id;
  //     return `https://picsum.photos/900/500?image=${randomId}`;
  //   });
  // }


}


