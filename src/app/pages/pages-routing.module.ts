import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './dashboard/invoices/invoices.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { UploadInvoiceComponent } from './dashboard/upload-invoice/upload-invoice.component';
import { InvoiceDataComponent } from './dashboard/invoice-data/invoice-data.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AdminGuard } from '../admin.guard';
import { GeneralGuard } from '../general.guard';
import { EditGuard } from '../edit.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'invoices',
      component: InvoicesComponent,
    },
    {
      path: 'upload-invoice',
      component: UploadInvoiceComponent,
      canActivate:[EditGuard]
    },
    {
      path: 'statistics',
      component: StatisticsComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
    {
      path:"invoice/:id",
      component: InvoiceDataComponent,
      canActivate:[EditGuard]
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: DashboardComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AdminGuard,GeneralGuard,EditGuard]
})
export class PagesRoutingModule {
}
