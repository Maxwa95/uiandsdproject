import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cart } from './models/cart';
import { checkout as cout } from "./models/checkout";
@Injectable({
  providedIn: 'root'
})
export class Cart {
  public carts : cart[] =  JSON.parse(localStorage.getItem('cart')) || [];
  private bs = new BehaviorSubject(this.carts);
   cart = this.bs.asObservable();
  constructor() {
 //this.carts = JSON.parse(localStorage.getItem('cart'));
   }
    addtocart(cart: cart) {
        if (this.carts.indexOf(cart) == -1) {
            this.carts.push(cart) 
            
        }else{
            this.carts[this.carts.indexOf(cart)].quantity +=1;
       }
       localStorage.setItem("cart",JSON.stringify(this.carts))
       this.cart = JSON.parse(localStorage.getItem('cart'))
       this.bs.next(this.carts)
      
    }

    removefromcart(cart: cart) {
   
        if (this.carts.indexOf(cart) != -1) {
            if (this.carts[this.carts.indexOf(cart)].quantity == 1) {
             this.carts.splice(this.carts.indexOf(cart),1)   
            }else
            this.carts[this.carts.indexOf(cart)].quantity -=1;
             }
             localStorage.setItem("cart",JSON.stringify(this.carts))
             this.bs.next(this.carts)
    }
    editcart(cart: cart) {
       
        if (this.carts.indexOf(cart) != -1) 
        {
            this.carts[this.carts.indexOf(cart)] = cart;
        }
        localStorage.setItem("cart",JSON.stringify(this.carts))
        this.bs.next(this.carts)
    }

    checkout()
    {
    let chkout = new cout()   
        let total = 0;
    this.carts.forEach(e => {
       total += e.product.Price * e.quantity
    });
    chkout.cart = this.carts
    chkout.total = total
    return chkout;
    }
    
   
}
  