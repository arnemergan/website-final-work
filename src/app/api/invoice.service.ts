import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  getAllOnUsername(page: number, size: number, username: string): Observable<Content>{
    return this.http.get<Content>(this.actionUrl + "/username?page=" + page + "&size=" + size + "&sort=createdDate&username=" + username);
  }

  getAllOnCategory(page: number, size: number, name: string): Observable<Content>{
    return this.http.get<Content>(this.actionUrl + "/category?page=" + page + "&size=" + size + "&sort=createdDate&name=" + name);
  }

  getSingle(id: string): Observable<Invoice> {
      return this.http.get<Invoice>(this.actionUrl + "/get/" +  id);
  }

  getImage(filename: string): Observable<HttpResponse<any>>{
    return this.http.get<HttpResponse<any>>(this.actionUrl + "/image/" + filename,{responseType: 'blob' as 'json'});
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

  approve(id: string, approved: boolean): Observable<Invoice>{
    return this.http.get<Invoice>(this.actionUrl + "/done?id="+ id +"&done=" + approved);
  }
}
