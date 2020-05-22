import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../api/tenant.service';
import { AuthService } from '../../../api/auth.service';
import { Tenant, User, UserAdmin, FTP } from '../../../api/models/models';
import { UserService } from '../../../api/user.service';
import { UserInfo } from 'os';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FtService } from '../../../api/ft.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  tenant: Tenant;
  user: User;
  tenantError: boolean = false;
  userError: boolean = false;
  addftpprop: boolean = false;
  ftps: Array<FTP>;
  newFtp:FTP;
  users: Array<UserAdmin> = new Array<UserAdmin>();

  constructor(public dialog: MatDialog,private router: Router,private tenantservice:TenantService, private ftService:FtService,private auth: AuthService, private userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initNewFtp();
    this.tenantservice.info().subscribe((t:Tenant) => {
      this.tenant = t;
    });
    this.getUserInfo();
    this.getFtpServers();
    this.getUsers();
  }

  editTenant() {
    this.tenantservice.update(this.tenant).subscribe((t:Tenant) => {
      this.tenant = t;
      this.tenantError = false;
      this.openSnackBar('Tenant updated','ok');
    }, error => {
      this.tenantError = true;
      console.log(error);
    });
  }

  editProfile() { 
    this.auth.update(this.user).subscribe((u:User) => {
      this.userError = false;
      this.getUserInfo();
      this.openSnackBar('User updated','ok');
    }, error => {
      this.userError = true;
      console.log(error);
    });
  }

  deleteTenant() { 
    this.tenantservice.delete().subscribe((t:Tenant) => {
      this.openSnackBar('Tenant deleted','ok');
      this.router.navigate(['/main/home']);
    }, error => {
      this.tenantError = true;
      console.log(error);
    });
  }

  editFtp(updateftp,id) {
    this.ftService.update(updateftp,id).subscribe(() => {
      this.getFtpServers();
      this.openSnackBar('Ftp updated','ok');
    }, error => {
      console.log(error);
    });
  }

  addFtp(): void {
    this.ftService.register(this.newFtp).subscribe(() => {
      this.getFtpServers();
      this.initNewFtp();
      this.openAddFtp();
      this.openSnackBar('Ftp added','ok');
    }, error => {
      console.log(error);
    });
  }
  openAddFtp(): void{
    this.addftpprop ? this.addftpprop = false: this.addftpprop = true;
  }

  deleteFtp(id){
    this.ftService.delete(id).subscribe(() => {
      this.getFtpServers();
      this.openSnackBar('Ftp deleted','ok');
    }, error => {
      console.log(error);
    });
  }

  deleteUser(username){
    this.userService.delete(username).subscribe(() => {
      this.getUsers();
      this.openSnackBar('User disabled','ok');
    }, error => {
      console.log(error);
    });
  }

  private initNewFtp(): void{
    this.newFtp = {
      host:'',
      folder:'',
      password:'',
      username:'',
      port:0
    }
  }

  private getFtpServers() :void {
    this.ftService.get().subscribe((ftp:Array<FTP>)=>{
      this.ftps = ftp;
    });
  }

  private getUserInfo() :void{
    this.auth.info().subscribe((u: User) => {
      this.user = u;
    });
  }

  private getUsers() :void{
    this.userService.users().subscribe((us:Array<UserAdmin>) => {
      this.users = us;
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
