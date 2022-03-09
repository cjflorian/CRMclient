import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Password } from '../models/password/password.module';
import { PasswordService } from '../services/password.service';
import { UserRolesService } from '../services/user-roles.service';
import { UserService } from '../services/user.service';
import { FormPasswordComponent } from './form/form-password.component';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  message: string;
  arrPasswords: any[];
  closeResult = '';
  @Input() Id: number;
  @Input() Sitio: string;
  @Input() Password: string;
  @Input() Fecha: string;
  @Input() Activo: boolean;
  @Input() UserName: string;
  myNewMethodSubs: Subscription = new Subscription;
  isLogin: boolean = false; // hidden by default
  currentPage: number;
  numPages: number;
  paginaActual: number;
  flag: boolean = false;
  flag2: boolean = false;
  flag3: boolean = false;
  flag4: boolean = false;
  flag5: boolean = false;


  @ViewChild("component1")
  component1!: FormPasswordComponent;

  constructor(private passwordService: PasswordService, private userService: UserService, private router: Router) {
    this.arrPasswords = [];
    this.Id = 0;
    this.Activo = false;
    this.Sitio = "";
    this.Password = "";
    this.Fecha = "";
    this.UserName = "";
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
    //console.log(session);
      if(session!==null)
      {
        this.isLogin==true;
      
        await this.passwordService.getAll(1, 'id', 'ASC', '')
        .then(
          response => {
            console.log(response.resultado);

            this.arrPasswords = response['resultado'];
            this.numPages = response['totalPaginas'];
          }
          /*passwords => this.arrPasswords = passwords
          */)
        .catch(error => console.log(console.error(error)));
      }
      else
      {
        this.isLogin==false 
        this.router.navigate(['login']);
      } 
  }

  
  async ngLoad() {
    await this.passwordService.getAll(this.currentPage,'id','ASC','')
      //.then(users => this.arrUsers = users)
      .then(response => {
        console.log(response);
        this.arrPasswords = response['resultado'];
        this.numPages = response['totalPaginas'];
      })
      .catch(error => console.log(console.error(error)));
    //console.log(this.arrUsers);
  }

  
  onClickEliminar(id: any) {
    if (confirm("Are you sure to delete" + id)) {
      this.passwordService.delete(id);
      this.ngLoad();
    }

  }

  async onClickModificar(id: any) {
    this.openPopup();
    this.passwordService.callToggle.next(id);//call by service
  }

  async onClickDetalle(id: any) {
    this.openPopupView();
    try {
      const password = await this.passwordService.getById(id);
      console.log(password[0].id);
      this.Id = password[0].id;
      this.Sitio = password[0].sitio;
      this.Password = password[0].password;
      this.Activo = password[0].activo;
      this.Fecha = password[0].fecha;
      this.UserName = password[0].userName;
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

    const response = await this.passwordService.getAll(this.currentPage,'id','DESC','');
    //console.log(response['resultado']);
    this.arrPasswords = response['resultado'];
  }


  // control de modales
  displayStyle = "none";
  displayStyleView = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  openPopupView (){
    this.displayStyleView ="block";
  }
  closePopupView (){
    this.displayStyleView="none"
  }

  async keyPressSearch(search: any){
    const response = await this.passwordService.getAll(this.currentPage,'id','DESC',search.target.value);
    console.log(response['resultado']);
    this.arrPasswords = response['resultado'];
  }

  
  async orderBy(filtro: any, orden: any) {

    switch (filtro) {
      case 'id':
        this.flag = !this.flag;
        await this.passwordService.getAll(this.currentPage, filtro, orden, '')
          .then(response => {
            this.arrPasswords = response['resultado'];
            this.numPages = response['totalPaginas'];
          })
          .catch(error => console.log(console.error(error)));
        break;
      case 'Sitio':
        this.flag2 = !this.flag2;
        await this.passwordService.getAll(this.currentPage, filtro, orden, '')
          .then(response => {
            this.arrPasswords = response['resultado'];
            this.numPages = response['totalPaginas'];
          })
          .catch(error => console.log(console.error(error)));
        break;
      case 'Password':
        this.flag3 = !this.flag3;
        await this.passwordService.getAll(this.currentPage, filtro, orden, '')
          .then(response => {
            this.arrPasswords = response['resultado'];
            this.numPages = response['totalPaginas'];
          })
          .catch(error => console.log(console.error(error)));
        break;
      case 'Fecha':
        this.flag4 = !this.flag4;
        await this.passwordService.getAll(this.currentPage, filtro, orden, '')
          .then(response => {
            this.arrPasswords = response['resultado'];
            this.numPages = response['totalPaginas'];
          })
          .catch(error => console.log(console.error(error)));
        break;

      case 'UserName':
        this.flag5 = !this.flag5;
        await this.passwordService.getAll(this.currentPage, filtro, orden, '')
          .then(response => {
            this.arrPasswords = response['resultado'];
            this.numPages = response['totalPaginas'];
          })
          .catch(error => console.log(console.error(error)));
        break;
      default:

    }
  }
  
  

    
  


}
