import { Component, OnInit, TemplateRef } from '@angular/core';
import { NeededProducts } from '../models/NeededProducts';
import { DataserviceService } from '../dataservice.service';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-need-product',
  templateUrl: './need-product.component.html',
  styleUrls: ['./need-product.component.scss']
})
export class NeedProductComponent implements OnInit {
  NeedProduct : NeededProducts = new NeededProducts()
  file : File ;
  modalRef: BsModalRef;

  constructor(public data : DataserviceService,public cookie:CookieService , private modalService: BsModalService,private rt : Router) { }

  ngOnInit() {
  }

  fileUpload(event : FileList){
    this.file = event.item(0)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submit()
  {

  if (this.NeedProduct.FullName != "" && this.NeedProduct.TextResponce != "" && this.file != undefined) {
    console.log(this.NeedProduct)
    this.data.Needproduct(this.cookie.get("access_token"),this.NeedProduct,this.file).subscribe(
      a=>{
this.rt.navigate(['/userorders'])
      }
      ,
      err=>{
        alert(err)
      }
    )
    
  }

  }

}
