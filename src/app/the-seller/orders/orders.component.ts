import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataserviceService } from '../../dataservice.service';
import { NeededProducts } from '../../models/NeededProducts';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  neededproduct : NeededProducts[] = []
  NeededProductID : string = ""
  itemtoshow : NeededProducts = new NeededProducts()

  constructor(private modalService: NgbModal,public data:DataserviceService,public cookie:CookieService) { 

this.data.GetOrders(this.cookie.get('access_token')).subscribe(

  a=>{
    console.log(a.json())
    this.neededproduct = a.json()
  }
)

  }
  closeResult: string;

  ngOnInit() {
  }


  open(content,item) {
    this.itemtoshow = item
    this.modalService.open(content).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  Orderaccept()
{

this.data.GetOrderbyid(this.cookie.get('access_token'),this.itemtoshow.NeededProductsId).subscribe(
  a=>{
   alert('Approved');
  }
)


}

}
