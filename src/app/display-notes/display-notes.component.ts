import { Component, OnInit } from '@angular/core';
import {   Input, HostListener, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() moreEvent = new EventEmitter<boolean>();
  noteclick: boolean = false;
  @Input() childMessage: any | undefined;
  // @ViewChild('moremenu') element!: ElementRef;
  // top: number = 0;
  // left : number = 0;
  more : boolean = false;
  constructor(elRef:ElementRef) { }
  move($event: any) {
    this.more = !this.more;
    this.moreEvent.emit(this.childMessage['noteId']);
  }

   @HostListener('click', ['$event'])
   noteClick(){
   }
   sendMessage() {
    this.messageEvent.emit(this.childMessage)
  }
  updateNoteProcess(){
    this.sendMessage();
  }
  ngOnInit(): void {
  }
}
