import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, } from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
    MatSnackBarConfig
} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { UserserviceService } from 'src/app/Services/Userservice/userservice.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !! (control && control.invalid && control.parent?.dirty);
    const invalidParent =
     !!(control && control.parent && control.parent.invalid && control.parent.dirty 
       && control.parent.hasError('notSame'));

    return (
      invalidCtrl ||
       invalidParent);
  }
} 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
matcher = new MyErrorStateMatcher();
hide = true;
public isActive: boolean;
public notSame: boolean;

public Email: string = '@gmail.com';
registerForm:FormGroup





constructor(private formBuilder:FormBuilder, private route:Router, private userService:UserserviceService, public snackBar: MatSnackBar) { 

    
  this.registerForm = this.formBuilder.group(
    {
      FirstName: new FormControl('', [Validators.required,
         Validators.pattern('^[A-Z][a-z]{2,}$')
        ] ,), 
      LastName: new FormControl('', [Validators.required, 
        Validators.pattern('^[A-Z][a-z]{2,}$')
      ],),
      Email: new FormControl('', [Validators.required, 
        Validators.pattern('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*$')
      ]),
      Password:  new FormControl('', [Validators.required, 
        Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
      ]),
      Confirm:  new FormControl('', [Validators.required,
        Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
      ])
    },
    { validators: this.checkPasswords },
  );   

  this.isActive = true;
  this.notSame = false;
} 


openSnackBar(message: string, duration: number) {
  let config = new MatSnackBarConfig();
  if (duration != 0)
  {
    config.duration = duration; 
  }
  this.snackBar.open(message, undefined, config);
}

  ngOnInit(){
  }

  
register() {
  console.log("register calling", this.registerForm.value);

  if(this.registerForm.valid){
    this.openSnackBar('Registering user...', 0);
    let reqData ={
      FirstName: this.registerForm.get('FirstName')?.value,
      LastName: this.registerForm.get('LastName')?.value,
      DateOfBirth:"1997-03-18",
      PhoneNumber:"8805956103",
      Email: this.registerForm.get('Email')?.value+this.Email,
      Password: this.registerForm.get('Password')?.value,
      
    }
    
    this.userService.registerUser(reqData).subscribe(
     (response:any) => {
        console.log("register successfull", response);
        this.openSnackBar('Registration successful', 2000);      
      },

      (error:any) => {
        if(error['status'] == 0){
          this.openSnackBar('Registration failed: server offline', 2000,);
        }
        else{
          this.openSnackBar('Registration failed: '+error['error']['message'], 2000);
        }
      }
      );
  } 
} 

TogglePassword(){
  this.isActive = this.isActive ? false : true 
}

checkPasswords(group: FormGroup) {
let password = group.controls.Password.value;
let confirmPassword = group.controls.Confirm.value;

return password === confirmPassword ? null : { notSame: true }
}


}





