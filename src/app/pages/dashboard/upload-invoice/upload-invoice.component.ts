import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './../../../api/invoice.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss']
})
export class UploadInvoiceComponent implements OnInit {

  download = true;
  done = false;
  loading = false;

  files: File[] = [];
 
  onSelect(event) {
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  constructor(private router: Router,private invoiceService:InvoiceService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  upload(){
    this.files.forEach(element => {
      let formdata: FormData = new FormData();
      formdata.append('image', element);
      formdata.append('lang','eng')
      this.invoiceService.upload(formdata).subscribe(next => {
        this.openSnackBar('Files uploaded successfull','ok');
      },
        error => () => {
          this.openSnackBar('Something went wrong','ok');
        });
    });
    this.files = [];
  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
