import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor( private HttpCl:HttpClient) { }
  baseUrl = environment.BaseUrl
  post(url:any, data:any, headers: any){
    console.log("http called");
    if(headers != null)
    {return this.HttpCl.post(this.baseUrl + url, data, headers);}
    return this.HttpCl.post(this.baseUrl  + url,data);  
    
}
Get(url: any, headers: any){
  if(headers != null)
  {return this.HttpCl.get(this.baseUrl + url, headers);}
  return this.HttpCl.get(this.baseUrl + url);
}
put(url: any, data : any, headers: any){
  if(headers != null)
  {
    return this.HttpCl.put(this.baseUrl + url, data, headers);
  }
  return this.HttpCl.put(this.baseUrl + url, data);
}
delete(url: any, headers: any){
  if(headers != null)
  {
    return this.HttpCl.delete(this.baseUrl + url, headers);
  }
  return this.HttpCl.delete(this.baseUrl + url);
}

}
