import { Component, OnInit, HostListener, ElementRef, AfterViewInit, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import {NoteServiceService} from '../Services/Noteservice/note-service.service';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit, AfterViewInit  {
  pin : boolean = false;
  Edit : boolean = false;
  @Output() messageEvent = new EventEmitter<any>();
  // Data exchange from child to parent
  // @Output() messageEvent = new EventEmitter<string>();



  constructor(private eRef: ElementRef, private elRef:ElementRef, private noteService:NoteServiceService) {  }
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.Edit = false;
      this.createNote();
      (<HTMLInputElement>document.getElementById("note")).innerText = '';
    }
  }

  takeNote(){
    this.createNote();
    this.Edit = false;
    (<HTMLInputElement>document.getElementById("note")).innerText = '';
  }

  
  createNote(){
    let reqData={
      Title :(<HTMLInputElement>document.getElementById("title"))?
       (<HTMLInputElement>document.getElementById("title")).value:'',
      Body : (<HTMLInputElement>document.getElementById("note")).innerText.trim(),
      IsPin: this.pin
  }
    if(reqData.Body != ''){
      this.noteService.addNote(reqData).subscribe(
        (response: any) => {
        console.log(response);
        
    
          
      });;
    }
    this.pin = false
  }

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    
  }
  
  togglePin(){
    this.pin = !this.pin; 
  }
  // adjustHeight(event: any){
  //   var target = event.target;
  //  target.style.height = "1px";
  //  target.style.height = (target.scrollHeight)+"px";
  // }


  displayFull(){
    this.Edit = true;
  }
  
}