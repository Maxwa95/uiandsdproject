import { Component, OnInit } from '@angular/core';
import {login} from '../models/login';
import {DataserviceService} from '../dataservice.service';
import { error } from 'protractor';
import { CookieService } from 'ngx-cookie-service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../../assets/scss/general.scss']
})
export class LoginComponent implements OnInit {
user : login = new login()
cookieValue = '';
public loading = false;
  constructor(private dataService : DataserviceService,private cookieService : CookieService,private rote:Router) 
  {
   console.log(this.cookieService.check("access_token"));
    
  }

  ngOnInit() {

  }
  login()
  {
  this.loading = true;  
  let body =  "username=" + this.user.username + "&password="+this.user.password+"&grant_type=password";
  this.dataService.login(body).subscribe(
    a=>{
      this.loading = false;
      //access token assign it to what ever
      this.cookieService.set( 'access_token', a.json().access_token,30);//30 days
      window.location.href = '/';
    },
    error => {
      this.loading = false;
      // alert(error);
    }
  )
  }

  // errorHandler(status){
  //   if(status == true){
  //     alert("valid")
  //     this.bool = true
  //   }else {
  //     this.bool = false
  //   }
    
  // }
}
