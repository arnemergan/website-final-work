import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Statistics, Category } from './models/models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private actionUrl = `${environment.baseApi}/category`;

  constructor(private http: HttpClient,private auth: AuthService) { }

  getAll(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(this.actionUrl + "/");
  }

  add(category:Category): Observable<Category> {
    return this.http.post<Category>(this.actionUrl + "/" , category);
  }

  delete(id: string): Observable<Object> {
    return this.http.delete(this.actionUrl + "/" + id);
  }
}
