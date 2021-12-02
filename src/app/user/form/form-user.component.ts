import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRolesService } from 'src/app/services/user-roles.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  formNewUser: FormGroup;
  myMethodSubs: Subscription = new Subscription;
  myNewMethodSubs: Subscription = new Subscription;
  isShowCreate: boolean = true ; // hidden by default
  isShowEdit: boolean = false ; // hidden by default
  arrUsers: any[];
  arrRoleUsers: any[];
  isLogin: boolean = false; // hidden by default
  constructor(private userService: UserService, private userRoleService: UserRolesService, private router: Router) {
    this.arrRoleUsers = [];
    this.arrUsers = [];
    this.isShowCreate=true;
    this.isShowEdit=true;
    this.formNewUser =  new FormGroup({
      id: new FormControl(''),
      name: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required
      ]),
      userRoleId: new FormControl('',[
        Validators.required
      ])
    });
   }
  
  ngOnInit(): void {
    let session = localStorage.getItem('user');
    //console.log(session);
      if(session!==null)
      {
        this.isLogin==true;
        this.myMethodSubs = this.userService.invokeMyMethod.subscribe(res => {
          console.log(res);
          this.methodToBeCalled(res);
        });
        
        this.userRoleService.getAll()
        .then(userrole => this.arrRoleUsers = userrole)
        .catch(error => console.log(console.error(error)));
      }
      else
      {
        this.isLogin==false 
        this.router.navigate(['login']);
      } 
  }

  
  async methodToBeCalled(id:any){
    //what needs to done
    this.isShowCreate = false;
    this.isShowEdit = true;
    try{
      const user = await this.userService.getById(id);
      
      this.formNewUser = new FormGroup({
        id: new FormControl(user.id,[
          Validators.required
        ]),
        name: new FormControl(user.name,[
          Validators.required
        ]),
        password: new FormControl(user.password),
        email: new FormControl(user.email,[
          Validators.required
        ]),
        userRoleId: new FormControl(user.userRoleId,[
          Validators.required
        ])
      });
     console.log(user);
        }
    catch(error){
      console.log(error);
      }
    }

    
  public onSubmit(): void{
    

    this.userService.create(this.formNewUser.value).then(function(res:any){
      Swal.fire('Creado con exito','Dato', 'success');
      
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    this.userService.callMyNewMethod();
    //this.formNewCliente.reset();
    //$('#myModalInsert').modal('hide');
    this.router.navigate(['/user']);
  }

  
  onClickModificar(){
    console.log(this.formNewUser.value);
    this.userService.update(this.formNewUser.value).then(function(res:any){
      Swal.fire('Modificado con exito','Dato', 'success');
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    this.userService.callMyNewMethod();
    this.formNewUser.reset();
    this.router.navigate(['/user']);
  }

}
