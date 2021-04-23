import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from '../Services/Userservice/userservice.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private UserServices : UserserviceService, private Router : Router){

  }
  canActivate(): boolean
  {
    if(this.UserServices.authenticateUser())
    {
      return true;
    } 
    this.Router.navigate(['/login']);
    return false;
  }  
  
}
