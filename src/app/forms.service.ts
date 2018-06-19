import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from './models/client';
import { seller } from './models/seller';
@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private gearclient = new Client();
  private bs = new BehaviorSubject(this.gearclient);
  clientform = this.bs.asObservable();
  constructor() { }
    addclient(gearc: Client) {
      this.bs.next(gearc)
    }
}
