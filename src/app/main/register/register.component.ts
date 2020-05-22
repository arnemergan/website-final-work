import { Component, OnInit } from '@angular/core';
import { Login, UserTokenDTO, TenantRegister, Tenant } from '../../api/models/models';
import { AuthService } from '../../api/auth.service';
import { Router } from '@angular/router';
import { TenantService } from '../../api/tenant.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerError = false;
  model: TenantRegister;
  form: FormGroup;
  required = new FormControl('',[Validators.required]);
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
    });
  }


  getErrorMessageRequired(){
    return this.required.hasError('required') ? 'Not valid value' : '';
  }
}
