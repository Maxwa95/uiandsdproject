import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service'
import { ActivatedRoute } from '@angular/router';
import {productdesc}from '../models/productdesc';
import {Category}from '../models/category';
import {brand}from '../models/brands';
import {model}from '../models/model';

@Component({
  selector: 'app-generate-product',
  templateUrl: './generate-product.component.html',
  styleUrls: ['./generate-product.component.scss']
})
export class GenerateProductComponent implements OnInit {
  url;
  products;
  public prod : productdesc = new productdesc;
  cates:Category[]=[];
  brands:brand[]=[];
  models:model[]=[]

  constructor(private http:DataserviceService, private route:ActivatedRoute,) { 
    this.url = this.route.snapshot.paramMap.get('id'); 
    this.http.getsingleprod(this.url).subscribe(
      (res) => {
        this.products = res.json()
        console.log(this.products);
        
      },
      (error) => {

      }
    )
  }

  
  onChange(event: any, input: any) {
    let files = [].slice.call(event.target.files);

    input.value = files.map(f => f.name).join(', ');
  }

  ngOnInit() {
    this.http.GetCategories().subscribe(
      (a)=>{
        this.cates=a.json()
        console.log(this.cates);
      },
      (e)=>{
        alert(e),null
      }
    )
    this.http.GetBrands().subscribe(
      (a)=>{
        this.brands=a.json()
        console.log(this.brands);
      },
      (e)=>{
        alert(e),null
      }
    )
    this.http.GetModels().subscribe(
      (a)=>
      {
        this.models=a.json()
        console.log(this.models);        
      },
      (e)=>{
        alert(e),null
      }
    )

  }




}
