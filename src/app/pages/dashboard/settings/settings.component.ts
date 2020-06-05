import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../../api/tenant.service';
import { AuthService } from '../../../api/auth.service';
import { Tenant, User, UserAdmin, FTP, Category, Authority, AuthorityUser, RegisterUser, registereduser } from '../../../api/models/models';
import { UserService } from '../../../api/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FtService } from '../../../api/ft.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../api/category.service';

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
  adduser: boolean = false;
  opencat: boolean =false;
  ftps: Array<FTP>;
  categories: Array<Category>;
  newFtp:FTP;
  newCategory:string = '';
  users: Array<UserAdmin> = new Array<UserAdmin>();
  visibleForAdmin: boolean = false;
  newUser:RegisterUser;
  authorities:Array<String> = ["ROLE_VIEW","ROLE_EDIT"];

  constructor(public dialog: MatDialog,private router: Router,private categoryService:CategoryService,private tenantservice:TenantService, private ftService:FtService,private auth: AuthService, private userService: UserService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initNewFtp();
    this.tenantservice.info().subscribe((t:Tenant) => {
      this.tenant = t;
    });
    this.visibleForAdmin = this.auth.hasPermission({authority:"ROLE_ADMIN"});
    this.getUserInfo();
    this.getFtpServers();
    this.getUsers();
    this.getCategories();
    this.initNewUser();
  }

  editTenant() {
    this.tenantservice.update(this.tenant).subscribe((t:Tenant) => {
      this.tenant = t;
      this.tenantError = false;
      this.openSnackBar('Tenant updated','ok');
    }, error => {
      this.tenantError = true;
    });
  }

  editProfile() { 
    this.auth.update(this.user).subscribe((u:User) => {
      this.userError = false;
      this.getUserInfo();
      this.openSnackBar('User updated','ok');
    }, error => {
      this.userError = true;
    });
  }

  deleteTenant() { 
    this.tenantservice.cancel(this.tenant.subscriptionId).subscribe((t:Tenant) => {
      this.openSnackBar('Tenant deleted','ok');
      this.auth.logout();
      this.router.navigate(['/main/home']);
    }, error => {
      this.tenantError = true;
    });
  }

  editFtp(updateftp,id) {
    this.ftService.update(updateftp,id).subscribe(() => {
      this.getFtpServers();
      this.openSnackBar('Ftp updated','ok');
    }, error => {
    });
  }

  openAdduser(): void{
    this.adduser ? this.adduser = false: this.adduser = true;
  }

  openAddCategory(): void{
    this.opencat ? this.opencat = false: this.opencat = true;
  }

  addCategory(): void {
    this.categoryService.add({name:this.newCategory,deletable:true,id:''}).subscribe((category:Category)=>{
      this.openSnackBar('Category added','ok');
      this.opencat = false;
      this.getCategories();
      this.newCategory = '';
    },error => {
      this.openSnackBar(error,'ok');
    });
  }

  deleteCategory(id: string): void {
    this.categoryService.delete(id).subscribe();
    this.getCategories();
    this.openSnackBar('Category deleted','ok');
  }

  addUser(): void{
    this.auth.register(this.newUser).subscribe((user:registereduser)=>{
      this.openSnackBar('User added','ok');
      this.initNewUser();
      this.adduser = false;
      this.getUsers();
    },error => {
      this.openSnackBar(error,'ok');
    });
  }

  addFtp(): void {
    this.ftService.register(this.newFtp).subscribe(() => {
      this.getFtpServers();
      this.initNewFtp();
      this.openAddFtp();
      this.openSnackBar('Ftp added','ok');
    }, error => {
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
    });
  }

  deleteUser(username){
    this.userService.delete(username).subscribe(() => {
      this.getUsers();
      this.openSnackBar('User disabled','ok');
    }, error => {
    });
  }

  getUserAuthorities(auth:Array<AuthorityUser>){
    const selection: Array<String> = [];
    auth.forEach(element => {
      selection.push(element.authority);
    });
    return selection;
  }

  private initNewUser(): void {
    this.newUser = {
      email:'',
      password:'',
      username:'',
      firstName:'',
      lastName:''
    }
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

  private getCategories(): void{
    this.categoryService.getAll().subscribe((newcategories:Array<Category>) => {
      this.categories = newcategories;
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
