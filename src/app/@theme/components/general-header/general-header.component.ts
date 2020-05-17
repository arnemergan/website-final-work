import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'ngx-general-header',
  styleUrls: ['./general-header.component.scss'],
  templateUrl: './general-header.component.html',
})
export class GeneralHeaderComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService){}

  ngOnInit(): void {
  }

  goToHome(){
      this.router.navigate(['/main/home']);
  }

  goToDashboard(){
    this.router.navigate(['/pages/dashboard']);
  }

  goToLogin(){
    this.router.navigate(['/main/login']);
  }

  goToRegister(){
    this.router.navigate(['/main/register']);
  }
}
