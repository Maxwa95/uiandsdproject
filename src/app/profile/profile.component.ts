import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  page = 1;

 constructor(private Ds : DataserviceService){

  this.Ds.setCart("Mahmoud")
 }
 ngOnInit()
{}

}
