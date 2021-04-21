import { Injectable } from '@angular/core';
import {HttpServiceService}  from '../http-service.service'
import {HttpHeaders} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private Https:HttpServiceService) { }
    registerUser(data:any) {
      console.log(" data in user services ", data );
      return this.Https.post('/Users/Register', data);
      
    }
    loginUser(data:any) {
      console.log(" login user services ", data );
      return this.Https.post('/Users/Login', data);
    }

    
  forgetUser(data:any) {
    console.log(" forget user services ", data );
    return this.Https.post('/Users/ForgetPassword', data);
  }
    
  
  resetUser(data:any) {
    console.log(" reset user services ", data );
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT'));  
    let options = { headers: headers };
    return this.Https.post('/Users/Resetpassword', data);
  }

}
