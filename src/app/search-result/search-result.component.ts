import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service'
import { product } from '../models/product';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  pagenumber : number = 1;
  prod : product[]=[];
 
   constructor(public dataservice : DataserviceService) 
   {
    
     this.dataservice.productsPaging(this.pagenumber).subscribe(
       (a)=>{
       this.prod =  a.json()
       } 
       )
   }
 
   ngOnInit() {
     
   }
 
 }
 