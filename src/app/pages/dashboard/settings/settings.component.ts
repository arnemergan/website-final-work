import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../api/tenant.service';
import { AuthService } from '../../../api/auth.service';
import { Tenant } from '../../../api/models/models';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  tenant:Tenant;

  constructor(private tenantservice:TenantService,private auth: AuthService) { }

  ngOnInit(): void {
    this.tenantservice.info().subscribe((t:Tenant) => {
      this.tenant = t;
    });
  }

}
