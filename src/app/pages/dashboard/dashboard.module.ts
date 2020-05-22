import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { InvoicesComponent } from './invoices/invoices.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { InvoiceDataComponent } from './invoice-data/invoice-data.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule  } from '@angular/material/table'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatBadgeModule } from '@angular/material/badge'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    NgxDropzoneModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    MatChipsModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    LayoutModule,
    RouterModule,
    MatDialogModule
  ],
  declarations: [
    DashboardComponent,
    InvoicesComponent,
    UploadInvoiceComponent,
    InvoiceDataComponent,
    StatisticsComponent,
    SettingsComponent
  ],
})
export class DashboardModule { }
