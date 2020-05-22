import { Component, OnInit } from '@angular/core';
import { Login, UserTokenDTO } from '../../api/models/models';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError = false;
  model: Login;

  constructor(private auth: AuthService,private router: Router
    ) { }

  ngOnInit(): void {
    this.model = {
      username: '',
      password: ''
    }
    this.loginError = false;
  }

  onSubmit() { 
    this.auth.login(this.model).subscribe((user:UserTokenDTO) => {
      this.loginError = false;
      this.auth.saveToken(user);
      this.router.navigate(['/pages/dashboard']);
    }, error => {
      this.loginError = true;
      console.log(error);
    });
  }

  getErrorMessage() {
    return this.loginError ? 'Not a valid username or password' : '';
  }
  
}
