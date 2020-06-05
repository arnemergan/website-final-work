import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../api/auth.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  visibleForEdit: boolean = false;

  constructor(private auth:AuthService){}
  ngOnInit(): void {
    this.visibleForEdit = this.auth.hasPermission({authority:"ROLE_EDIT"}) || this.auth.hasPermission({authority:"ROLE_ADMIN"});
  }
}
