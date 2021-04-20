import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  ForgetForm:FormGroup
  constructor(private formBuilder:FormBuilder) { 
    this.ForgetForm = this.formBuilder.group(
      {
        email: ['', Validators.required]
      }
    );   
  } 


  ngOnInit(): void {
  }
  forget(){}
  
}
