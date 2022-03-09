import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PasswordService } from 'src/app/services/password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.css']
})
export class FormPasswordComponent implements OnInit {
  formNewPassword: FormGroup;
  myMethodSubs: Subscription = new Subscription;
  myNewMethodSubs: Subscription = new Subscription;
  isShowCreate: boolean = true; // hidden by default
  isShowEdit: boolean = false; // hidden by default
  arrPasswords: any[];
  isLogin: boolean = false; // hidden by default
  flag: boolean = true;

  constructor(private passwordService: PasswordService, private router: Router) {
    this.arrPasswords = [];

    this.formNewPassword = new FormGroup({
      Id: new FormControl(''),
      Sitio: new FormControl('', [
        Validators.required
      ]),
      Password: new FormControl('', [
        Validators.required
      ])

    });

    this.passwordService.callToggle.subscribe((data) => {
      this.showEdit(data);
    });


  }



  async ngOnInit() {
    let session = localStorage.getItem('user');
    //console.log(session);
      if(session!==null)
      {
        this.isLogin==true;
      
      }
      else
      {
        this.isLogin==false 
        this.router.navigate(['login']);
      } 
  }

  // editar datos
  
  async showEdit(id:any){
    //what needs to done
    this.flag = false;
    this.isShowCreate = false;
    this.isShowEdit = true;
    try{
      const password = await this.passwordService.getById(id);
      
      this.formNewPassword = new FormGroup({
        Id: new FormControl(password[0].id,[
          Validators.required
        ]),
        Sitio: new FormControl(password[0].sitio,[
          Validators.required
        ]),
        Password: new FormControl(password[0].password),
        UserName: new FormControl(password[0].UserName,[
          Validators.required
        ]),
        Fecha: new FormControl(password[0].Fecha,[
          Validators.required
        ])
      });
     //console.log(user);
        }
    catch(error){
      console.log(error);
      }
    }

    
    
  async onSubmit(){
    
    this.passwordService.create(this.formNewPassword.value).then(function(res:any){
      console.log(res);
      Swal.fire('Creado con exito','Dato', 'success');
    })
    .catch(error => {
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    this.router.navigate(['/password']);
  }

  
  onClickModificar(){
    //console.log(this.formNewUser.value);
    this.passwordService.update(this.formNewPassword.value).then(function(res:any){
      Swal.fire('Modificado con exito','Dato', 'success');
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    //this.formNewUser.reset();
    this.passwordService.reloadToggle.next();
    this.passwordService.closedToggle.next();
    this.router.navigate(['/password']);
    
  }



}
