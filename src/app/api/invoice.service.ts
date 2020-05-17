import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Invoice,Content } from './models/models';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private actionUrl = `${environment.baseApi}/invoices`;

  constructor(private http: HttpClient,public auth: AuthService) { }

  getAll(page: number, size: number): Observable<Content>{
    return this.http.get<Content>(this.actionUrl + "?page=" + page + "&size=" + size + "&sort=createdDate");
  }

  getSingle(id: string): Observable<Invoice> {
      return this.http.get<Invoice>(this.actionUrl + "/get/" +  id);
  }

  update(id: string,item: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(this.actionUrl + "/update/" + id,item);
  }

  upload(formdata:FormData){
    return this.http.post(this.actionUrl + "/upload" ,formdata)
  }

  delete(id: string): Observable<Invoice> {
    return this.http.delete<Invoice>(this.actionUrl + "/delete/" +  id);
  }
}
