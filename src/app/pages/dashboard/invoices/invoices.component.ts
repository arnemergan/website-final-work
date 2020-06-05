import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../api/invoice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice, Category } from '../../../api/models/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { CategoryService } from '../../../api/category.service';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements AfterViewInit, OnInit {
  dataSource: MatTableDataSource<Invoice>;
  length = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  selectedCategory = 'default';
  username = '';
  options: Category[] = [];
  visibleForEdit: boolean = false;
  visibleForAdmin: boolean = false;
  displayedColumns: string[] = ['createdDate','lastModifiedDate','dueDate','vendorName', 'total', 'done','action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private auth: AuthService,private router: Router,private invoiceService:InvoiceService,private _snackBar: MatSnackBar,private categoryService:CategoryService) { }
  
  ngOnInit(): void {
    this.visibleForAdmin = this.auth.hasPermission({authority: "ROLE_ADMIN"});
    this.visibleForEdit = this.auth.hasPermission({authority:"ROLE_EDIT"}) || this.auth.hasPermission({authority:"ROLE_ADMIN"});
    this.getCategories();
  }

  ngAfterViewInit() {
    this.getInvoices();
  }

  changeAll(): void {
    this.getInvoices();
  }
  
  changedCategory(value) :void{
    this.getInvoicesOnCategory(value);
  }

  changedUsername() :void{
    this.getInvoicesOnUserName(this.username);
  }

  toDetail(id){
    this.router.navigate(['/pages/invoice', id]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  approve(id: string, approve: boolean){
    this.invoiceService.approve(id,approve).subscribe((invoice:Invoice)=>{
      this.openSnackBar("Invoice updated",'ok')
      this.getInvoices();
    });
  }

  private getCategories(){
    this.categoryService.getAll().subscribe((categories:Array<Category>) => {
      this.options = categories;
    });
  }

  private getInvoices(){
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.invoiceService.getAll(this.paginator.pageIndex,10);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.length = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource =  new MatTableDataSource(data));
  }

  private getInvoicesOnCategory(category){
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.invoiceService.getAllOnCategory(this.paginator.pageIndex,10,category);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.length = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource =  new MatTableDataSource(data));
  }

  private getInvoicesOnUserName(username){
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.invoiceService.getAllOnUsername(this.paginator.pageIndex,10,username);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.length = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource =  new MatTableDataSource(data));
  }
}
