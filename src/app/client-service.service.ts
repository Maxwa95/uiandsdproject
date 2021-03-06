import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataserviceService } from './dataservice.service';
import { Router, CanActivate } from '@angular/router';
import { Observable, of,BehaviorSubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Role } from "./models/Role";
import { promise } from 'protractor';


@Injectable()
export class ClientService implements CanActivate {
  token : string = ""
  constructor(public router: Router,public cookie : CookieService,public data:DataserviceService) {
    this.token = this.cookie.get("access_token");
  }
    
    
  canActivate() : Promise<boolean> {
    
    return this.data.Getclientgrants(this.token)
    .then((a) => {
     if(a.json().Type == "Client"){
return true;
     }
    })
    .catch((err) => {
      this.router.navigate(['/login'])
      return false;
    });
  }

}
 