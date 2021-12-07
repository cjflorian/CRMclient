import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user/user.module';
import { UserService } from '../services/user.service';
import { FormUserComponent } from './form/form-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  message: string;
  arrUsers: any[];
  closeResult = '';
  user: Users[];
  @Input () id: number;
  @Input () name: string;
  @Input () email: string;
  @Input () password: string;
  @Input () userRoleId: number;
  @Input () nameRole: string;
  myNewMethodSubs: Subscription = new Subscription;
  isLogin: boolean = false; // hidden by default

  @ViewChild("component1")
  component1!: FormUserComponent;


  constructor(private userService: UserService, private router: Router) { 
    this.arrUsers = [];
    this.user = [];
    this.id = 0;
    this.name = "";
    this.email = "";
    this.password = "";
    this.userRoleId = 0;
    this.nameRole = "";
    this.message = "";
  }

  async ngOnInit() {
    let session = localStorage.getItem('user');
    //console.log("comp"+session);
      if(session!==null)
      {
        this.isLogin==true;
        await this.ngLoad();

      }
      else
      {
        this.isLogin==false 
        this.router.navigate(['login']);
      } 
    
  }

  
  async ngLoad() {
    await this.userService.getAll()
    .then(users => this.arrUsers = users)
    .catch(error => console.log(console.error(error)));
    console.log(this.arrUsers);
  }

  
  onClickEliminar(id:any){
    if(confirm("Are you sure to delete" + id)) {
      this.userService.delete(id);
      this.ngLoad();
    }
    
  }

  async onClickModificar(id:any){
    this.userService.callToggle.next(id);
  }

  async onClickDetalle(id:any){
    try{
      const user = await this.userService.getById(id);
      //console.log(user);
      this.id = user.id;
      this.name = user.name;
      this.password = user.password;
      this.email = user.email;
      this.userRoleId = user.userRoleID;
      this.nameRole = user.nameRole;
        }
    catch(error){
      console.log(error);
      }
    }

}