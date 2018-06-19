import { Component, OnInit } from '@angular/core';
import{FormsService} from '../../forms.service'
import{Client} from'../../models/client'
import {DataserviceService} from '../../dataservice.service';
import{seller} from'../../models/seller'
import { Router } from '@angular/router';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss', '../../../assets/scss/general.scss']
})
export class Step1Component implements OnInit {
public client=new Client();
public seller:seller=new seller();
companyStatus:Boolean=false;
  constructor(private form: FormsService,private dataService : DataserviceService, private route:Router) { 
    this.form.clientform.subscribe(a=>this.client=a);
  }

  ngOnInit() {
    if(this.companyStatus==true){

    }
  }
  register(){
    this.dataService.registerclient(this.client).subscribe(

      a=>{
this.route.navigate(["/login"])

      },error=>alert(error)
    );

   };
   
   addcompany(){
    
  
    
      this.seller.city=this.client.city;
      this.seller.ConfirmPassword=this.client.ConfirmPassword;
      this.seller.Email=this.client.Email;
      this.seller.FirstName=this.client.FirstName;
      this.seller.LastName=this.client.LastName;
     this.seller.Password=this.client.Password;
    this.seller.PhoneNumber=this.client.PhoneNumber;

   
  }
   
   registerseller11():void{
    if(this.companyStatus == false){
      this.dataService.registerclient(this.client).subscribe(
        a=>{
          this.route.navigate(["/login"])
        }
                 ,
               error=>alert(error),
               null
       ) }
       else{
        
     console.log(this.seller);
     this.dataService.registerseller(this.seller).subscribe(
       null,e=>console.log(e)
     )
   }
  }


  }