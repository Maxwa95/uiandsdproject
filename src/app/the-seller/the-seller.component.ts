import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { DataserviceService } from "../dataservice.service";
import { productsbycompany } from "../models/productsbycompany";
import { CookieService } from 'ngx-cookie-service';
import { product } from '../models/product';
import { brand } from '../models/brands';
import { model } from '../models/model';
@Component({
  selector: 'app-the-seller',
  templateUrl: './the-seller.component.html',
  styleUrls: ['./the-seller.component.scss']
})
export class TheSellerComponent implements OnInit {
 public products :Promise<product[]>;
 public prods : product[] = []
 public token : string = ""

  constructor(public router : Router,public data:DataserviceService,public cookie : CookieService) {
    this.token = this.cookie.get("access_token")
this.products = this.data.Getproducts(this.cookie.get("access_token")).then(
a=>{
  console.log(a.json())
  return a.json()
}
)

this.products.then(
a=>{
  this.prods = a } 
).catch(e=>{alert(e)})
   
}

  ngOnInit() {
    console.log(this.products);
  }

  edit(prodid : number){
    alert(prodid)
  this.router.navigate([`/editProduct/${prodid}`]);
  }
  delete(prodid : number){
   
 if  (confirm("Are you sure to delete this product ?"))
 {
  this.data.DeleteProduct(prodid,this.token).subscribe(
    a=>alert(a),
    e=>alert(e)
  )

 }else
 return false;

  }
}
