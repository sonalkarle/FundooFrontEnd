import { AfterViewInit, Component, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { NoteServiceService } from  '../Services/Noteservice/note-service.service';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';




@Component({
  
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit, OnChanges {
  updating: boolean = false;

  mobileQuery: MediaQueryList;
  value = 'Search';
  notes!: [];
  updateNote : any
  @ViewChild("upnote")  upNote! : ElementRef;
  top: number = 0;
  left : number = 0;
  more : boolean = false;
  deleteNoteId: number = 0;
  prevNoteID : number = 0;
  parentMessage = this.loadActiveNotes();

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,  private noteService:NoteServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  @ViewChild('updateNote') set updatedNote(element: any) {
    if (element) {
      this.upNote.nativeElement.focus();
    }
  }
  @HostListener('click', ['$event'])
  position($event: any){
    if($event.srcElement.id=="moremenu"){
  //    console.log($event.path[3].id);
      
      this.left = $event.target.offsetLeft + $event.path[5].offsetLeft;
      this.top = $event.path[5].offsetTop + $event.path[3].clientHeight;
      if( this.prevNoteID == 0)
      {
        this.prevNoteID = this.deleteNoteId
      }
      if(this.prevNoteID == this.deleteNoteId){
        this.more = !this.more;
        this.prevNoteID = this.deleteNoteId
      }
      else{
        this.more = true;
        this.prevNoteID = this.deleteNoteId
      }
      
    }
    else{
      this.more = false;
    }    
  }

  ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
     this.parentMessage;
    this.loadActiveNotes();   
  }
  deleteNote(){
    this.noteService.deleteNote(this.deleteNoteId).subscribe(
      (response: any) => {
      this.loadActiveNotes();
    });;
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.updating)    
    console.log(changes)
  }
  
  loadActiveNotes(){
    this.noteService.GetNotes().subscribe(
      (response: any) => {
        console.log (response);
      this.notes = response['notes'] ['result'];
    });
  }
  receiveMessage($event: any) {
    this.loadActiveNotes();
  }
  receiveMoreEvent($event: any) {
    this.deleteNoteId= $event;
  }
  receiveNoteMessage($event: any) {
    this.updateNote = $event
    this.updating = true;
  }
  focusNote(){
    this.upNote.nativeElement.focus();
  }

  UpdateNote(){
    
    let reqData={
      noteID : this.updateNote['noteId'],
      title :(<HTMLInputElement>document.getElementById("up-title")).innerText.trim(),
      body : (<HTMLInputElement>document.getElementById("upnote")).innerText.trim()
    }

    if(this.updateNote != reqData){
      this.noteService.updateNote(reqData).subscribe(
        (response: any) => {
        this.loadActiveNotes();
      });;
    }
    this.updating = false;
  } 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {

  }


}

