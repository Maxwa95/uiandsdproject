import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DataserviceService } from '../dataservice.service'
import {search} from '../models/search'
import { Router } from '@angular/router';
import { cart } from '../models/cart';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
    '../../assets/scss/general.scss'
    ]
})
export class HeaderComponent implements OnInit {
  keywords:string = '';
  searchResult=[];
  allCarts:cart[] = [];
  public search = new search();
  user : string = ''
  type : string = ''
  constructor(private http:DataserviceService, private url:Router,private c:CookieService) { 
  this.search.catsmatch=[]; 
  this.search.productsmatch=[""];
  this.allCarts =  JSON.parse(localStorage.getItem('cart')) || [];
  this.http.GetUserName(this.c.get('access_token')).then(
a=>{
this.user = ' مرحبا ' + a.json().name 

}
  ).catch(
e=>
 this.user = ''
  )


  this.http.Getusergrants(this.c.get('access_token')).then(
a=> {  this.type = a.json().Type  }

  ).catch(
    e=>{
    this.http.Getclientgrants(this.c.get('access_token')).then(
    a=>  this.type = a.json().Type

    ).catch()

    e=> this.type = ''
  
  
    }




  )
    
  }

ngOnInit() {
    console.log(this.keywords);  
  }
  logout()
  {
this.http.Logout(this.c.get('access_token')).then(
a=>{
this.user = '';
this.c.delete('access_token')
location.reload()
}

)

  }


  sendKey(){
    if(this.keywords.length > 0){

      this.http.searchByKey(this.keywords).subscribe(
        (res) => {
          console.log(res);
          this.search = res.json();
          console.log( this.search)
        },
        (error) =>{
        }
      )
    }

     else {
     }
  }

  



  goURL(){
    this.url.navigate(['/search'])

  }



  burgerButton(e) {
   document.getElementsByClassName('bars-1')[0].classList.toggle("toggle-bars-1")
   document.getElementsByClassName('bars-2')[0].classList.toggle("toggle-bars-2")
   document.getElementsByClassName('bars-3')[0].classList.toggle("toggle-bars-3")
   document.getElementsByClassName('mobile-menu')[0].classList.toggle("show")
  }



}
