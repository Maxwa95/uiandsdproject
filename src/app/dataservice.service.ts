import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, of,BehaviorSubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Client } from './models/client';
import { seller } from './models/seller';
import { login } from './models/login';
import { ProductInfo } from './models/ProductInfo';
import { productdesc } from './models/productdesc';
import { NeededProducts } from './models/NeededProducts';
import { checkout  } from "./models/checkout";
// import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { feedback } from './models/feedback';
import { ChangePasswordBindingModel } from './models/changepassword';
//import { json } from 'ng4-validators';

@Injectable({
  providedIn: 'root'
})

export class DataserviceService {

  carts = '';

  constructor(private http : Http, private cookieService : CookieService) { }
  

  // get single prod
  getsingleprod(id:string){
    return this.http.get('http://gearapi.azurewebsites.net/api/singleproduct/'+id)
  }
    
  //getfilterbybrandandcategory
  getfilter(){
    return this.http.get('http://gearapi.azurewebsites.net/api/getfilterdata')
  }

// Search
searchByKey(key){
  return this.http.get(`http://gearapi.azurewebsites.net/api/search/${key}`)
}

  //  Get Top Selling Products
  get_top_selling_products(){
    return this.http.get('http://gearapi.azurewebsites.net/api/ClientProducts');
  }

  productsPaging(num : number){
    return this.http.get('http://gearapi.azurewebsites.net/api/clientproducts/byname?pagenum='+num);
  }

  //  Get Recent Products
  recentProducts(){
    return this.http.get('http://gearapi.azurewebsites.net/api/clientProducts/last');
  }

// best offers
  bestOffers(){
    return this.http.get('http://gearapi.azurewebsites.net/api/clientProducts/offers')
  }

  registerclient(data:Client){
    let headers = new Headers();
    headers.append('Content-type','application/x-www-form-urlencoded'); 
    
    return this.http.post('http://gearapi.azurewebsites.net/api/Account/Register',data);
  }
  registerseller(data:seller){
    return this.http.post('http://gearapi.azurewebsites.net/api/Account/RegisterSeller',data);
  }

  login(data:string){
    
    let headers = new Headers();
    headers.append('Content-type','application/x-www-form-urlencoded'); 
    return this.http.post('http://gearapi.azurewebsites.net/token',data,{
      headers: headers
    });
  }

  
  //  Add To Cart Functions
  setCart(item){
    this.http.get("/").toPromise()
    this.carts = item
  }

  getCart(){
    return this.carts
  }


  //  Filter Function

  filterSearchByName(pnum:number=1, pname:string='*'){
    return this.http.get('http://gearapi.azurewebsites.net/api/ClientProducts/byname?pagenum='+pnum+'&name='+pname)
  }

  filterByBrandAndCat(pnum:number=1, cname, bname,state:string='*',min=0,max=0){
    if (cname.length == 0) {
      cname = "*";
    }else{
      cname = cname.join(",");
    }
    if(bname.length == 0){
      bname = "*";
    }else{
      bname = bname.join(",");
    }
    return this.http.get('http://gearapi.azurewebsites.net/api/filterclientproducts?pagenum='+pnum+'&catename='+cname+'&brandsname='+bname+'&status='+state+'&low='+min+'&high='+max)
  }
  //selller infos
profileCompany(compid:number){
  return this.http.get('http://gearapi.azurewebsites.net/api/Seller/'+compid);
}
productsPerCompany(compid:number){
  return this.http.get('http://gearapi.azurewebsites.net/api/Seller/GetProducts/'+compid);
}
GetBrands()
{
  return this.http.get('http://gearapi.azurewebsites.net/api/Brands')
}

GetCategories()
{
  return this.http.get('http://gearapi.azurewebsites.net/api/categories')
}
GetModels()
{
  return this.http.get('http://gearapi.azurewebsites.net/api/models')
}
AddProduct(pro:productdesc,access_token : string)
{
  
     let headers = new Headers();
    headers.append('Authorization','Bearer '+access_token); 
    headers.append('Content-type','application/json');
  return this.http.post('http://gearapi.azurewebsites.net/api/seller/product',pro,{headers:headers}).toPromise();
}
AddImagestoProduct(access_token : string, imgs : File[],prodid : string)
{ 
  debugger; 
  let headers = new Headers();
  headers.append('Authorization','Bearer '+access_token); 
  let options = new RequestOptions({ headers: headers });
   let fd = new FormData();
   fd.append('prodid',prodid)
   for (let index = 0; index < imgs.length; index++) {
    fd.append('imgs'+index,imgs[index], imgs[index].name)
   }
  return this.http.post('http://gearapi.azurewebsites.net/api/seller/productImages',fd,options);
}
EditProduct(pro:productdesc,access_token : string)
{
  
   let headers = new Headers();
   headers.append('Authorization','Bearer '+access_token);
   headers.append('Content-type','application/json');
  return this.http.put('http://gearapi.azurewebsites.net/api/seller/product',pro,{headers:headers});
}

DeleteProduct(pro:number,access_token : string)
{
     let headers = new Headers();
   headers.append('Authorization','Bearer '+access_token);
  return this.http.delete(`http://gearapi.azurewebsites.net/api/seller/product/${pro}`,{headers:headers});
}

Getusergrants(access_token : string)
{
  let headers = new Headers();
  headers.append('Authorization','Bearer '+access_token);
  return this.http.get('http://gearapi.azurewebsites.net/api/whoami',{headers:headers}).toPromise()
}

Getclientgrants(access_token : string)
{
  let headers = new Headers();
  headers.append('Authorization','Bearer '+access_token);
  return this.http.get('http://gearapi.azurewebsites.net/api/whoami/client',{headers:headers}).toPromise()
}


Getproducts(access_token : string)
{
  let headers = new Headers();
  headers.append('Authorization','Bearer '+access_token);
  return this.http.get('http://gearapi.azurewebsites.net/api/seller/GetProducts',{headers:headers}).toPromise();
}

Needproduct(access_token : string,NeededProducts : NeededProducts,file:File)
{
  let headers = new Headers();
  headers.append('Authorization','Bearer '+access_token);
  let formData: FormData = new FormData()  
  let options = new RequestOptions({ headers: headers });
  formData.append("FullName", NeededProducts.FullName);
  formData.append("TextResponce", NeededProducts.TextResponce);
  formData.append('Image', file, file.name);
  return this.http.post("http://gearapi.azurewebsites.net/api/need",formData,options)
}

DeleteNeedproduct(access_token : string,id : string)
{
  let headers = new Headers();
  headers.append('Authorization','Bearer '+access_token);
  let options = new RequestOptions({ headers: headers });
  return this.http.delete(`http://gearapi.azurewebsites.net/api/need/${id}`,options)
}

confirmOrder(access_token : string,cout:checkout)
    {
      let headers = new Headers();
  headers.append('Authorization','Bearer '+access_token);
  let options = new RequestOptions({ headers: headers });
return this.http.post("http://gearapi.azurewebsites.net/api/confirmorder",cout,options)

    }
    Addcomment(access_token : string,comment:feedback)
    {
      let headers = new Headers();
      headers.append('Authorization','Bearer '+access_token);
      let options = new RequestOptions({ headers: headers });
      return this.http.post("http://gearapi.azurewebsites.net/api/Feedback",comment,options)
    }

    Logout(access_token : string)
    {
      let headers = new Headers();
      headers.append('Authorization','Bearer '+access_token);
      let options = new RequestOptions({ headers: headers });
      return this.http.post("http://gearapi.azurewebsites.net/api/Account/Logout",{},options).toPromise()
    }
    ChangePassword(access_token : string,changepass : ChangePasswordBindingModel)
    {
      let headers = new Headers();
      headers.append('Authorization','Bearer '+access_token);
      let options = new RequestOptions({ headers: headers });
      return this.http.post("http://gearapi.azurewebsites.net/api/Account/ChangePassword",changepass,options)
   }
   GetOrders(access_token : string)
   {
     let headers = new Headers();
    headers.append('Authorization','Bearer '+access_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://gearapi.azurewebsites.net/api/needed",options)
   }
   GetOrderbyid(access_token : string,id : string)
   {
     let headers = new Headers();
    headers.append('Authorization','Bearer '+access_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`http://gearapi.azurewebsites.net/api/needed/${id}`,options)
   }
   ClientGetNeededProductsDetalis(access_token : string)
   {
     let headers = new Headers();
    headers.append('Authorization','Bearer '+access_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`http://gearapi.azurewebsites.net/api/neededproductforclient`,options)
   }
   GetUserName(access_token : string)
   {
    let headers = new Headers();
    headers.append('Authorization','Bearer '+access_token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`http://gearapi.azurewebsites.net/api/AccountInfo`,options).toPromise()
   }
}