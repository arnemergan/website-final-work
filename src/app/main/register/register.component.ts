import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import {  TenantRegister, Tenant } from '../../api/models/models';
import { Router } from '@angular/router';
import { TenantService } from '../../api/tenant.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ElementOptions, ElementsOptions, StripeService, StripeCardComponent } from 'ngx-stripe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  registerError = false;
  model: TenantRegister;
  form: FormGroup;
  required = new FormControl('',[Validators.required]);
  choosePay: string;
  payments: string[] = ['10', '15'];
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  constructor(private tenant:TenantService,private router: Router,private stripeService:StripeService,private _snackBar:MatSnackBar) { }
  ngOnInit(): void {
    history.state.data !== undefined ? this.choosePay = history.state.data : this.choosePay = '10';
    this.model = {
      maxEmployees:10,
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
  const name = this.model.name;
  this.stripeService.createToken(this.card.getCard(),{name}).subscribe(result  => {
    if (result.token) {
      this.model.stripeToken = result.token.id;
      this.model.plan = this.choosePay === '15' ? "plan_HKZq3uJ4e3ghvO":"plan_H5G398DbnwEDy0";
      this.model.maxEmployees = this.choosePay === '15' ? 25: 10;
      this.tenant.register(this.model).subscribe((tenant:Tenant) => {
        this.registerError = false;
        this.openSnackBar("Tenant created.","ok");
        this.router.navigate(['/main/login']);
      }, error => {
        this.openSnackBar(error,"ok");
        this.registerError = true;
      });
    } else if (result.error) {
      this.registerError = true;
    }
  });
  }


  getErrorMessageRequired(){
    return this.required.hasError('required') ? 'Not valid value' : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
