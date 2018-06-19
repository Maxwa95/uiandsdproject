import {img} from './image';
import {Description} from './Description';
import { brand } from './brands';
import { model } from './model';

export class product{
 Imgs : img[]
 productId:number
 ProductName: string=""
 PlaceOfOrigin:string = ""
 DateOfPublish:Date= new Date(1111)
 Price:number
 Discount:number
 Quantity:number = 0
 Rate:number = 0
 Description:Description
 bra:brand
 BrandId:number
 Modelid:number
 CategoryId:number
 Manufacturer:string = "" 
 state:string = ""
 CompanyId:number = 2
 Product : product
 Brands : brand = new brand()
 Models : Description = new Description()
 }