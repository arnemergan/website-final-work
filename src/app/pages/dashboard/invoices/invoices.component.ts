import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../api/invoice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../../../api/models/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Invoice>;

  length = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  displayedColumns: string[] = ['createdDate','lastModifiedDate','dueDate','vendorName', 'total', 'status','action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,private invoiceService:InvoiceService,private _snackBar: MatSnackBar) { }

  ngAfterViewInit() {
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
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource =  new MatTableDataSource(data));
  }

  toDetail(id){
    this.router.navigate(['/pages/invoice', id]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
