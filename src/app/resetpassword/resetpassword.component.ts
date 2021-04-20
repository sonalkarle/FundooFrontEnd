import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  
  public isActive: boolean;
  public token: string;
  resetPassword:FormGroup;
  action: boolean = false;
  setAutoHide: boolean = false;

  constructor(private formBuilder:FormBuilder) { 
    
    this.resetPassword = this.formBuilder.group(
    {
      password:  new FormControl('', [Validators.required, 
        Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
      ]),
      confirmPassword:  new FormControl('', [Validators.required, 
      ])
    },
      { validators: this.checkPasswords },
    );   
    this.isActive = true;
    this.token = '';
  } 
  

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
  
    return pass === confirmPass ? null : { notSame: true }
  }
  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  ngOnInit(): void {

    
  }
  
  ResetPassword(){
  
  }
}