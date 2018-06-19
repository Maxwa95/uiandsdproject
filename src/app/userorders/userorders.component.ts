import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataserviceService } from '../dataservice.service';
import { NeededProducts } from '../models/NeededProducts';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-uorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  neededproduct : NeededProducts[] = []

  constructor(private modalService: NgbModal,public data:DataserviceService,public cookie:CookieService) { 

this.data.ClientGetNeededProductsDetalis(this.cookie.get('access_token')).subscribe(

  a=>{
    console.log(a.json())
    this.neededproduct = a.json()
  }
)

  }
  closeResult: string;

  ngOnInit() {
  }


delete(id : string)
{

this.data.DeleteNeedproduct(this.cookie.get('access_token'),id).subscribe(

  a=>{

    location.reload()
  }
)

}


}
