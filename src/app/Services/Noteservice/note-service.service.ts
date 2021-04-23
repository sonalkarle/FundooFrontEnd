import { Injectable } from '@angular/core';
import {  HttpServiceService } from '../Httpservice/http-service.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {
  headers = new HttpHeaders()
  .set('Authorization', 'Bearer '+localStorage.getItem('FunDooJwt')); 
  options = { headers: this.headers };
  constructor(  private httpService :HttpServiceService ) { }

  addNote(data: any) {
    console.log(" data in user services ", data );
    return this.httpService.post('/Notes', data, this.options);
  }


  GetNotes(){
    return this.httpService.Get('/Notes', this.options)
  }

  updateNote(data: any ) {
 
    return this.httpService.put('/Notes/Update', data, this.options);
  }
  deleteNote(NoteID: number)
  {
    return this.httpService.delete('/Notes/'+NoteID, this.options);
  }
  
}
