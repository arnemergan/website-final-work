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
  selectedCategory: string = 'default';
  username = '';
  options: Category[] = [];
  visibleForEdit: boolean = false;
  visibleForAdmin: boolean = false;
  selectedCategoryFilter: boolean = false;
  selectedUsernameFilter: boolean = false;
  pageNumberOptions: Array<number> = [10,20,100];
  selectedPageNumber: number = 20;
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

  changePage(): void {
    this.getInvoices();
  }

  changeAll(): void {
    this.filters(false,false);
    this.getInvoices();
  }
  
  changedCategory() :void{
    this.filters(true,false);
    this.getInvoices();
  }

  changedUsername() :void{
    this.filters(false,true);
    this.getInvoices();
  }

  toDetail(id){
    this.router.navigate(['/pages/invoice', id]);
  }

  approve(id: string, approve: boolean){
    this.invoiceService.approve(id,approve).subscribe((invoice:Invoice)=>{
      this.openSnackBar("Invoice updated",'ok')
      this.getInvoices();
    });
  }

  private filters(categoryb: boolean,userb: boolean) : void{
    this.selectedCategoryFilter = categoryb;
    this.selectedUsernameFilter = userb;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
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
          if(this.selectedCategoryFilter){
            return this.invoiceService.getAllOnCategory(this.paginator.pageIndex,this.selectedPageNumber,this.selectedCategory);
          }else if(this.selectedUsernameFilter){
            return this.invoiceService.getAllOnUsername(this.paginator.pageIndex,this.selectedPageNumber,this.username);
          }
          return this.invoiceService.getAll(this.paginator.pageIndex,this.selectedPageNumber);
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
