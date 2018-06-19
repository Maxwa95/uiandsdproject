import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service'
import { product } from '../models/product';
// import tinySlider from 'tiny-slider'
// import { tns } from "tiny-slider/src/tiny-slider.module"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../../assets/scss/general.scss']
})
export class HomeComponent implements OnInit {
  topSell=[];
  recentProducts =[];
  bestOffer = [];
  images;
  slider;
  constructor(private dataservice:DataserviceService) {
    this.images = ['../../assets/img/slider1.jpg', '../../assets/img/slider2.jpg']

  
  }
  
  ngOnInit() {
    this.topSelling();
    this.recent();
    this.bestOffers()
    this.topSelling()    
  }



  //  Get Top Selling Produts

  topSelling(){
     this.dataservice.get_top_selling_products().subscribe(
      (res)=>{
      this.topSell =  res.json()
      console.log(this.topSell);
      
      } 
    ) 
  }

  // best Offers

  bestOffers(){
    this.dataservice.bestOffers().subscribe(
      (res)=> {
        this.bestOffer = res.json()        
      }
    )
  }

  recent(){
    this.dataservice.recentProducts().subscribe( 
      (res) => {
        this.recentProducts = res.json()
        console.log(res.json());
        
      }
    )
  } 

}
