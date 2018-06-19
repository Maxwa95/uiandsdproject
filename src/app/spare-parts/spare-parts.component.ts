import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { product } from '../models/product';
import{Categoryandbrand} from '../models/cate_brand';
import { ActivatedRoute } from '@angular/router';
import { Cart } from "../cart.service";
import { NouisliderModule } from 'ng2-nouislider';
import { Router, CanActivate } from '@angular/router';
// import { NouiFormatter } from "ng2-nouislider/src/nouislider";                           


@Component({
  selector: 'app-spare-parts',
  templateUrl: './spare-parts.component.html',
  styleUrls: ['./spare-parts.component.scss','../../assets/scss/general.scss']
})
export class SparePartsComponent implements OnInit {
 pagenumber : number = 1;
 prod : product[]=[];
 catKeywords = [];
 brandsname = [];
 url:string = ''
 test = '';
 statenew = true
 stateused = true
 state = '*'


 public disabled: boolean = false;          
 public someValue: number = 0;
 public someMin: number = 0;
 public someMax: number = 10000;
 
 public loading = false;
  public numbers;
 catesandbrands:Categoryandbrand=new Categoryandbrand();
 currentRate = 3.5;
  constructor(public dataservice : DataserviceService,
     private route:ActivatedRoute,
    private cart:Cart
    ) 
  {
    
    this.numbers = Array(20).fill(2).map((x,i)=>i);
 
    this.url = this.route.snapshot.paramMap.get('name');
    if(this.url != undefined)
      {
        this.dataservice.filterSearchByName(this.pagenumber, this.url).subscribe(
         a=> this.prod =  a.json()
        )   
      }
      else
    this.dataservice.productsPaging(this.pagenumber).subscribe(
      (a)=>{
      this.prod =  a.json()
      } 
      )

      this.dataservice.getfilter().subscribe(
        (a)=>{
          console.log(a.json())
          this.catesandbrands=a.json();
        }
      )

    
  }

  ngOnInit() {
    
  }
  cstate()
  {

    this.state = (this.statenew == true && this.stateused == true) || (this.statenew == false && this.stateused == false)  ? '*' : this.statenew == true ? 'NEW' : 'USED';
    this.dataservice.filterByBrandAndCat(this.pagenumber, this.catKeywords, this.brandsname,this.state,this.someMin,this.someMax).subscribe(
      (a) => {
         this.loading = false;           
         this.prod =  a.json(); 
      },
      (error) => {
          this.loading = false;     
      }
    )
  }

  onChange(){
    this.state = (this.statenew == true && this.stateused == true) || (this.statenew == false && this.stateused == false)  ? '*' : this.statenew == true ? 'NEW' : 'USED';
    this.dataservice.filterByBrandAndCat(this.pagenumber, this.catKeywords, this.brandsname,this.state,this.someMin,this.someMax).subscribe(
      (a) => {
         this.loading = false;           
         this.prod =  a.json(); 
      },
      (error) => {
          this.loading = false;     
      }
    )
    
  }

  keywords(item){
    this.loading = true;       
    if(this.catKeywords.indexOf(item) == -1){
      this.catKeywords.push(item)
    }else {
      this.catKeywords.splice(this.catKeywords.indexOf(item),1)  
    }
    this.state = (this.statenew == true && this.stateused == true) || (this.statenew == false && this.stateused == false)  ? '*' : this.statenew == true ? 'NEW' : 'USED';
    this.dataservice.filterByBrandAndCat(this.pagenumber, this.catKeywords, this.brandsname,this.state,this.someMin,this.someMax).subscribe(
      (a) => {
         this.loading = false;           
         this.prod =  a.json(); 
      },
      (error) => {
          this.loading = false;     
      }
    )
  }

  keyWordsBrand(item){
    this.loading = true;   
    if(this.brandsname.indexOf(item) == -1){
      this.brandsname.push(item)

    }else {
      this.brandsname.splice(this.brandsname.indexOf(item),1)   
    }
    this.state = (this.statenew == true && this.stateused == true) || (this.statenew == false && this.stateused == false)  ? '*' : this.statenew == true ? 'NEW' : 'USED';
    this.dataservice.filterByBrandAndCat(this.pagenumber, this.catKeywords, this.brandsname,this.state,this.someMin,this.someMax).subscribe(
      (a) => {
        this.loading = false;    
        this.prod =  a.json()  
      },
      (error) => {
        this.loading = false;    
      }
    )
  }
}


