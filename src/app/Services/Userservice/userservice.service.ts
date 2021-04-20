import { Injectable } from '@angular/core';
import {HttpServiceService}  from '../http-service.service'


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private Https:HttpServiceService) { }
    registerUser(data:any) {
      console.log(" data in user services ", data );
      return this.Https.post('/Users/Register', data);
    
    
      
    }
  
}
