import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{UserserviceService} from 'src/app/Services/Userservice/userservice.service'
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  public token: string;

  resetPassword:FormGroup

  public isActive: boolean;

public Email: string = '@gmail.com';

  constructor(private formBuilder:FormBuilder, public snackBar: MatSnackBar ,private userService:UserserviceService ) 
     { 
    
    this.resetPassword = this.formBuilder.group(
    {
      newPassword:  new FormControl('', [Validators.required, 
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
  
  
  ngOnInit(): void {}  
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }  

  
  checkPasswords(group: FormGroup) {
    let newPassword = group.controls.newPassword.value;
    let confirmPassword = group.controls.confirmPassword.value;
  
    return newPassword === confirmPassword ? null : { notSame: true }
  }
  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  ResetPassword(){
    if(this.resetPassword.valid){
      this.openSnackBar(' reset...', 0);
      let reqData ={
        newPassword: this.resetPassword.get('newPassword')?.value,
        confirmPassword: this.resetPassword.get('confirmPassword')?.value
      }
      this.userService.resetUser(reqData).subscribe(
        (response: any) => {
          this.openSnackBar('password reset is successful', 2000);
        },
        error => {
          try {
            if(error['status'] == 0){
              this.openSnackBar('Reset failed: server offline', 2000,);
            }
            else{
              this.openSnackBar('Reset failed: '+error['error']['message'], 2000,);
            }
            } catch (error) {

          }
        });
    } 

  
  }
}