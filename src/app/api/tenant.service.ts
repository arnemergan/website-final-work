import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { Tenant, TenantRegister } from './models/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private actionUrl = `${environment.baseApi}/tenant`;
  constructor(private http: HttpClient,){}
  
  info(): Observable<Tenant>{
    return this.http.get<Tenant>(this.actionUrl + "/info");
  }

  register(tenant: TenantRegister): Observable<Tenant>{
    return this.http.post<Tenant>(this.actionUrl + "/register", tenant);
  }

  update(tenant: Tenant): Observable<Tenant>{
    return this.http.post<Tenant>(this.actionUrl + "/update",tenant);
  }

  cancel(id: string): Observable<Object>{
    return this.http.post<Tenant>(this.actionUrl + "/cancel/" + id, null);
  }
}
