
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators,} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatSnackBarConfig,
MatSnackBarHorizontalPosition,
MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import{UserserviceService} from 'src/app/Services/Userservice/userservice.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isActive: boolean;
  loginForm:FormGroup
  public Email: string = '@gmail.com';
 
 
  constructor(private formBuilder:FormBuilder,private Userservice:UserserviceService,
    public snackBar: MatSnackBar) { 
    this.loginForm = this.formBuilder.group(
      {
        Email: new FormControl('', [Validators.required, 
          Validators.pattern('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*$')
        ]),
        Password:  new FormControl('', [Validators.required, 
          Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
        ]),}
    );   
    this.isActive = true;
  } 
  ngOnInit(): void {
  }
  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }

  login() {

    
    if(this.loginForm.valid){
      this.openSnackBar('Login in...', 0);
      let reqData ={
        Email: this.loginForm.get('Email')?.value+this.Email,
        Password: this.loginForm.get('Password')?.value
      }
      this.Userservice.loginUser(reqData).subscribe(
        (response: any) => {
          localStorage.setItem('FunDooJwt', response['token']);
          this.openSnackBar('Login success', 2000);
         
        },
        error => {
          try {
            if(error['status'] == 0){
              this.openSnackBar('Login failed: server offline', 2000,);
            }
            else{
              this.openSnackBar('Login failed: '+error['error']['message'], 2000,);
            }
            } catch (error) {

          }
        });
    } 
  }
}