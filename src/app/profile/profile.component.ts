import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { CookieService } from 'ngx-cookie-service';
import{servicproduct}from '../models/serviceproduct'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  page = 1;
  prods:servicproduct[]=[]

 constructor(private Ds : DataserviceService,private cookie:CookieService){


  this.Ds.Getpurchasesprods(this.cookie.get("access_token")).subscribe(
    a=>{
      this.prods=a.json();
      console.log(this.prods)
    },e=>alert(e)
  )
 }
 ngOnInit()
{}

}
