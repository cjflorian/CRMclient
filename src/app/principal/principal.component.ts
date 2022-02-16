import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  [x: string]: any;
  
  isLogin: boolean = false; // hidden by default
  userName: any;

  constructor(private router: Router) {
    this.userName = "";
   }
  

  ngOnInit(): void {
    
    let session:any  = localStorage.getItem('user');
    console.log(session);
    let usuario = JSON.parse(session);
    let email = usuario["email"];
    
    this.userName = email;
      if(session!==null)
      {
        this.isLogin==true 
      }
      else
      {
        this.isLogin==false 
        this.router.navigate(['login']);
      }    
    }
}
