import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userName: any;

  constructor() { 
    this.userName = "";
  }

  ngOnInit(): void {
    
    let session:any  = localStorage.getItem('user');
    console.log(session);
    let usuario = JSON.parse(session);
    let email = usuario["email"];
    
    this.userName = email;
  }

}
