import { Component, OnInit } from '@angular/core';
import { Login, UserTokenDTO, TenantRegister, Tenant } from '../../api/models/models';
import { AuthService } from '../../api/auth.service';
import { Router } from '@angular/router';
import { TenantService } from '../../api/tenant.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerError = false;
  model: TenantRegister;
  
  constructor(private tenant:TenantService,private router: Router) { }

  ngOnInit(): void {
    this.model = {
      maxEmployees:100,
      email:'',
      country:'',
      name:'',
      firstName:'',
      lastName:'',
      username: '',
      password: ''
    }
    this.registerError = false;
  }

  onSubmit() { 
    this.tenant.register(this.model).subscribe((tenant:Tenant) => {
      this.registerError = false;
      this.router.navigate(['/main/login']);
    }, error => {
      this.registerError = true;
      console.log(error);
    });
  }

  getErrorMessage() {
    return this.registerError ? 'Register fields are not correct' : '';
  }
  

}
