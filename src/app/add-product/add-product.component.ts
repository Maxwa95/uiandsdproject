import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {productdesc}from '../models/productdesc';
import {  DataserviceService} from "../dataservice.service";
import {Category}from '../models/category';
import {brand}from '../models/brands';
import {model}from '../models/model';
import { log } from 'util';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  cates:Category[]=[];
  brands:brand[]=[];
  models:model[]=[]
  
  prod:productdesc=new productdesc()
  imgs : File[]
  
  constructor(private cookieService : CookieService,private Data : DataserviceService) { 


  }

  ngOnInit() {
    this.Data.GetCategories().subscribe(
      a=>this.cates=a.json(),e=>alert(e),null
    )
    this.Data.GetBrands().subscribe(
      a=>this.brands=a.json(),e=>alert(e),null
    )
    this.Data.GetModels().subscribe(
      a=>this.models=a.json(),e=>alert(e),null
    )

  }
  fileUpload(event){
    this.imgs= event;
    console.log(this.imgs.length)
  }

  save():void{
    if (this.imgs != undefined) {
      
      this.Data.AddProduct(this.prod,this.cookieService.get("access_token")).then(

   a=>{
     console.log(a.json().id)
      this.Data.AddImagestoProduct(this.cookieService.get("access_token"),this.imgs,a.json().id)
.subscribe(a=>{
alert('done')
})
 }
      )
    }

  }

}
