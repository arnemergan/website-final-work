import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { AuthService } from '../api/auth.service';
import { StatisticsService } from '../api/statistics.service';
import { InvoiceService } from '../api/invoice.service';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main.component';
import { ThemeModule } from '../@theme/theme.module';
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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent, HomeComponent, RegisterComponent, MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ThemeModule,
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
    FormsModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    InvoiceService,
    StatisticsService
  ],
})
export class MainModule { }
