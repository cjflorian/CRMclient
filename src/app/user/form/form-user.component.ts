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
    this.formNewUser =  new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('',[
        Validators.required
      ]),
      Password: new FormControl('',[
        Validators.required
      ]),
      Email: new FormControl('',[
        Validators.required
      ]),
      UserRoleId: new FormControl(0,[
        Validators.required
      ])
    });

    this.userService.callToggle.subscribe((data) => {
      this.showEdit(data);
    });
    
   }
  
  async ngOnInit() {
    let session = localStorage.getItem('user');
    //console.log(session);
      if(session!==null)
      {
        this.isLogin==true;
      
        await this.userRoleService.getAll()
        .then(usersRole => this.arrRoleUsers = usersRole)
        .catch(error => console.log(console.error(error)));
      }
      else
      {
        this.isLogin==false 
        this.router.navigate(['login']);
      } 
  }

  
  async showEdit(id:any){
    //what needs to done
    this.isShowCreate = false;
    this.isShowEdit = true;
    try{
      const user = await this.userService.getById(id);
      
      this.formNewUser = new FormGroup({
        Id: new FormControl(user[0].id,[
          Validators.required
        ]),
        Name: new FormControl(user[0].name,[
          Validators.required
        ]),
        Password: new FormControl(user[0].password),
        Email: new FormControl(user[0].email,[
          Validators.required
        ]),
        UserRoleId: new FormControl(user[0].userRoleId,[
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
    
    this.userService.create(this.formNewUser.value).then(function(res:any){
      console.log(res);
      Swal.fire('Creado con exito','Dato', 'success');
    })
    .catch(error => {
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    this.router.navigate(['/users']);
  }

  
  onClickModificar(){
    debugger;
    //console.log(this.formNewUser.value);
    this.userService.update(this.formNewUser.value).then(function(res:any){
      Swal.fire('Modificado con exito','Dato', 'success');
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    //this.formNewUser.reset();
    this.userService.reloadToggle.next();
    this.userService.closedToggle.next();
    this.router.navigate(['/users']);
    
  }

}
