import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/auth.service';
import { passwordChanger, User } from '../../api/models/models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  token: string = '';
  username: string = '';
  password :passwordChanger;
  passwordError: boolean = false;

  constructor(private authService:AuthService,private router:Router,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.password = {
      newPassword:'',
      oldPassword:'123456789123456'
    }
  }
  
  onSubmit() { 
    this.authService.changepasswordfirst(this.token,this.username,this.password).subscribe((user:User) => {
      this.passwordError = false;
      this.openSnackBar("Password changed, you can login now.","ok");
    }, error => {
      this.openSnackBar(error,"ok");
      this.passwordError = true;
    });
  }

  getErrorMessage() {
    return this.passwordError ? 'Not a valid' : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
