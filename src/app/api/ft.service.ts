import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { Tenant, Authority, UserAdmin, FTP } from './models/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FtService {
  private actionUrl = `${environment.baseApi}/ftp`;

  constructor(private http: HttpClient,) { }

  get(): Observable<Array<FTP>>{
    return this.http.get<Array<FTP>>(this.actionUrl + "/");
  }
  
  register(ftp:FTP): Observable<FTP>{
    return this.http.post<FTP>(this.actionUrl + "/",ftp);
  }

  update(ftp: FTP, id: string): Observable<FTP>{
    return this.http.put<FTP>(this.actionUrl + "/" + id,ftp);
  }
  
  delete(id: string): Observable<FTP>{
    return this.http.delete<FTP>(this.actionUrl + "/" + id);
  }
}
