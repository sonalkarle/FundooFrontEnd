import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor( private HttpCl:HttpClient) { }
  baseUrl = environment.BaseUrl
  post(url:any, data:any){
    console.log("http called");
    return this.HttpCl.post(this.baseUrl  + url,data);

   
}
}
