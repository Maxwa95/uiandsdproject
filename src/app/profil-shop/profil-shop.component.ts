import { Component, OnInit } from '@angular/core';

import { DataserviceService } from '../dataservice.service';
import { company } from '../models/company';
import { ActivatedRoute } from '@angular/router';
import { product } from '../models/product';

@Component({
  selector: 'app-profil-shop',
  templateUrl: './profil-shop.component.html',
  styleUrls: ['./profil-shop.component.scss']
})
export class ProfilShopComponent implements OnInit {
 public companyId : number =2;
 public companyProfile :company = new company();
 public productlst : product [] ;
  constructor(public dataservice : DataserviceService, private route:ActivatedRoute) 
  {
    this.dataservice.profileCompany(this.companyId).subscribe(
      (a)=>{
      this.companyProfile =  a.json()
      } 
      )
      this.dataservice.productsPerCompany(this.companyId).subscribe(
        (a)=>{
        this.productlst =  a.json()
        } 
        )
  }

  ngOnInit() {
   
    
  }
}
