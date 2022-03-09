import { Component, enableProdMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('user');
    
    Swal.hideLoading();
    Swal.fire('Logout','Adios', 'success');
    console.log(environment);
    
    
    this.router.navigate(['login']);
  }

}
