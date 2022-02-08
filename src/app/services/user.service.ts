import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Users } from '../models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string;
  callToggle = new Subject();
  reloadToggle = new Subject();
  closedToggle = new Subject();
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://8d1obz8j0j.execute-api.us-east-2.amazonaws.com/Prod/api/users';
    //this.baseUrl="https://localhost:5001/api/users"
   }//inyeccion de cliente


   getAll(pPage = 1, orden='id', tipo_orden='ASC', buscar: any): Promise<any>{
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"];
    let newURL = '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    console.log('busqueda: '+buscar)
    if(buscar=='')
    {
      newURL = `${this.baseUrl}?orden=${orden}&tipo_orden=${tipo_orden}&pagina=${pPage}&registros_por_pagina=10`;
    }
    else
    {
      newURL = `${this.baseUrl}?buscar=${buscar}`;
    }
    return this.httpClient.get<any>(newURL, httpOptions).toPromise();
    //?orden=id&tipo_orden=ASC&pagina=2&registros_por_pagina=10
  }

  //observable
  getById(pId: number): Promise<any> { // UN UNICO OBJETO
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    return this.httpClient.get<any>(`${this.baseUrl}/${pId}`, httpOptions).toPromise();
   
  }


  create(user: any): Promise<Users[]>{
    debugger;
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    let usrRoleID = parseInt(user.UserRoleId);
    let newUser = new Users(0, user.Name, user.Password, user.Email, usrRoleID);
    let response = this.httpClient.post<any>(this.baseUrl, newUser, httpOptions).toPromise();
    
    //console.log(response);
    return response;
  }

  update(user: any): Promise<any[]>{
    const bodyRequest = user;
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    
    let usrRoleID = parseInt(user.UserRoleId);
    let editUser = new Users(user.Id, user.Name, user.Password, user.Email, usrRoleID);
    //console.log(editUser);
    const result = this.httpClient.put<any>(this.baseUrl, editUser,  httpOptions).toPromise();
    return result;
  }


  delete(pId: number): Promise<any[]>{
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    return this.httpClient.delete<any>(`${this.baseUrl}/${pId}`,  httpOptions).toPromise();
  }


}
