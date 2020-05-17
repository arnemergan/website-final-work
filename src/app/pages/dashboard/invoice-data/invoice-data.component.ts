import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../../api/models/models';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceService } from '../../../api/invoice.service';
import { formatDate} from '@angular/common';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-invoice-data',
  templateUrl: './invoice-data.component.html',
  styleUrls: ['./invoice-data.component.scss']
})

export class InvoiceDataComponent implements OnInit {

  model: Invoice;
  id:string;
  constructor(private router: Router,private route: ActivatedRoute,private _snackBar: MatSnackBar,private invoiceService:InvoiceService,public auth: AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.invoiceService.getSingle(this.id).subscribe(data => this.add(data));
  }

  add(data){
    this.model = data;
    formatDate(this.model.createdDate,'dd-MM-yyyy HH:mm','nl');
    formatDate(this.model.lastModifiedDate,'dd-MM-yyyy HH:mm','en-US');
  }

  onSubmit() { 
    this.invoiceService.update(this.id,this.model).subscribe(data => this.openSnackBar('Invoice updated','ok'),error => this.openSnackBar('Invoice error','ok'));
  }

  required = new FormControl('',[Validators.required]);
  email = new FormControl('', [Validators.email]);

  getErrorMessageRequired(){
    return this.required.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageEmail() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  toInvoices(){
    this.router.navigate(['invoices']);

  }

  toStatistics(){
    this.router.navigate(['statistics']);
  }

  toHome(){
    this.router.navigate(['dashboard']);
  }
}
