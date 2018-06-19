import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss',"../../assets/scss/general.scss"]
})
export class FooterComponent implements OnInit {

  constructor(private http:DataserviceService) { 

  }

  ngOnInit() {
  }

}
