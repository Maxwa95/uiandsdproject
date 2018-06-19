import { Component, OnInit } from '@angular/core';
import {DataserviceService}from '../dataservice.service'
import { Router } from '@angular/router';
import{FormsService} from '../forms.service';
import{Client} from'../models/client'
import { FormsModule} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss','../../assets/scss/general.scss']
})
export class RegisterComponent implements OnInit {
private client=new Client();
  constructor(private route:Router,private form: FormsService) { }

  ngOnInit() {
  }
  navigate(){
    this.form.addclient(this.client)
    this.route.navigate(["/step1"]);
  }

}
 