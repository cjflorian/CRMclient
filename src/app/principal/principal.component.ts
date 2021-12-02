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

  constructor(private router: Router) { }

  ngOnInit(): void {
    let session = localStorage.getItem('user');
    console.log("comp"+session);
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
