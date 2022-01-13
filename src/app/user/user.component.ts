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
  @Input() id: number;
  @Input() name: string;
  @Input() email: string;
  @Input() password: string;
  @Input() userRoleId: number;
  @Input() nameRole: string;
  myNewMethodSubs: Subscription = new Subscription;
  isLogin: boolean = false; // hidden by default
  currentPage: number;
  numPages: number;
  paginaActual: number;

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
    this.currentPage = 1;
    this.numPages = this.currentPage;
    this.paginaActual = this.currentPage;

    this.userService.reloadToggle.subscribe(() => {
      this.ngLoad();
    });

    this.userService.closedToggle.subscribe(() => {
      this.closePopup();
    });
  }

  async ngOnInit() {
    let session = localStorage.getItem('user');
    //console.log("comp"+session);
    if (session !== null) {
      this.isLogin == true;
      await this.ngLoad();

    }
    else {
      this.isLogin == false
      this.router.navigate(['login']);
    }

  }


  async ngLoad() {
    await this.userService.getAll(this.currentPage)
      //.then(users => this.arrUsers = users)
      .then(response => {
        //console.log(response);
        this.arrUsers = response['resultado'];
        this.numPages = response['totalPaginas'];
      })
      .catch(error => console.log(console.error(error)));
    //console.log(this.arrUsers);
  }


  onClickEliminar(id: any) {
    if (confirm("Are you sure to delete" + id)) {
      this.userService.delete(id);
      this.ngLoad();
    }

  }

  async onClickModificar(id: any) {
    this.openPopup();
    this.userService.callToggle.next(id);//call by service
  }

  async onClickDetalle(id: any) {
    try {
      const user = await this.userService.getById(id);
      console.log(user[0].id);
      this.id = user[0].id;
      this.name = user[0].name;
      this.password = user[0].password;
      this.email = user[0].email;
      this.userRoleId = user[0].userRoleID;
      this.nameRole = user[0].nameRole;
    }
    catch (error) {
      console.log(error);
    }
  }

  async changePage(siguiente: any) {
    if (siguiente) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }

    const response = await this.userService.getAll(this.currentPage);
    //console.log(response['resultado']);
    this.arrUsers = response['resultado'];
  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}