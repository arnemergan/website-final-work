import { Component, OnInit } from '@angular/core';
import { Invoice, Category, Line } from '../../../api/models/models';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceService } from '../../../api/invoice.service';
import { formatDate} from '@angular/common';
import { AuthService } from '../../../api/auth.service';
import { CategoryService } from '../../../api/category.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-invoice-data',
  templateUrl: './invoice-data.component.html',
  styleUrls: ['./invoice-data.component.scss']
})

export class InvoiceDataComponent implements OnInit {

  model: Invoice;
  newLine: Line;
  id:string;
  imageData:any;
  options: Category[] = [];
  open:boolean = false;
  constructor(private sanitizer:DomSanitizer,private categoryService:CategoryService,private router: Router,private route: ActivatedRoute,private _snackBar: MatSnackBar,private invoiceService:InvoiceService,public auth: AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.invoiceService.getSingle(this.id).subscribe((data:Invoice) => this.add(data));
    this.getCategories();
    this.initLine();
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  add(data){
    this.model = data;
    formatDate(this.model.createdDate,'dd-MM-yyyy HH:mm','en-US');
    formatDate(this.model.lastModifiedDate,'dd-MM-yyyy HH:mm','en-US');
    this.model.dueDate != "" ? this.model.dueDate = formatDate(this.model.dueDate,'yyyy-MM-dd','en-US'): this.model.dueDate = "";
    this.model.invoiceDate != "" ? this.model.invoiceDate = formatDate(this.model.invoiceDate,'yyyy-MM-dd','en-US'): this.model.invoiceDate = "";
    this.invoiceService.getImage(this.model.filename).subscribe(response => {
      console.log(response)
      this.imageData = URL.createObjectURL(response);
    });
  }

  changedCategory(option){
    this.model.categoryName = option;
  }

  addLine(){
    this.model.lines.push(this.newLine);
    this.initLine();
    this.openLine();
  }

  openLine(): void{
    this.open ? this.open = false: this.open = true;
  }

  onSubmit() { 
    this.model.dueDate = formatDate(this.model.dueDate,'dd/MM/yyyy','en-US');
    this.model.invoiceDate = formatDate(this.model.invoiceDate,'dd/MM/yyyy','en-US');
    this.invoiceService.update(this.id,this.model).subscribe(data => {
      this.openSnackBar('Invoice updated','ok');
      this.add(data);
    },error => this.openSnackBar(error,'ok'));
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

  private getCategories(){
    this.categoryService.getAll().subscribe((categories:Array<Category>) => {
      this.options = categories;
    });
  }

  private initLine(): void{
    this.newLine = {
      id:'',
      description:'',
      amount:0,
      unitPrice:0,
      quantity:0
    }
  }
}
