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
      UserRoleId: new FormControl('',[
        Validators.required
      ])
    });
   }
  
  async ngOnInit() {
    let session = localStorage.getItem('user');
    //console.log(session);
      if(session!==null)
      {
        this.isLogin==true;
        this.myMethodSubs = this.userService.invokeMyMethod.subscribe(res => {
          console.log(res);
        });

        await this.userRoleService.getAll()
        .then(usersRole => this.arrRoleUsers = usersRole)
        .catch(error => console.log(console.error(error)));
        if (this.isShowCreate)
        {
            // ultimo id
            await this.userService.getAll()
            .then(users => this.arrUsers = users)
            .catch(error => console.log(console.error(error)));
            let len = this.arrUsers.length;
            let ultimo = (this.arrUsers[len-1].id)+1;
            console.log(ultimo);

            this.formNewUser.patchValue({
              Id: ultimo
          });
          
        }
        
    

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
        Id: new FormControl(user.id,[
          Validators.required
        ]),
        Name: new FormControl(user.name,[
          Validators.required
        ]),
        Password: new FormControl(user.password),
        Email: new FormControl(user.email,[
          Validators.required
        ]),
        UserRoleId: new FormControl(user.userRoleId,[
          Validators.required
        ])
      });
     console.log(user);
        }
    catch(error){
      console.log(error);
      }
    }

    
  async onSubmit(){
    
   
    let form = this.formNewUser.value;
    console.log(form);

    
    
    this.userService.create(this.formNewUser.value).then(function(res:any){
      Swal.fire('Creado con exito','Dato', 'success');
      
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error: '+error.error.mensaje,error.error.error, 'error');
    });
    this.userService.callMyNewMethod();
    this.router.navigate(['/users']);
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
