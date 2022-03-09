import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Subject } from 'rxjs';
import { Password } from '../models/password/password.module';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  baseUrl: string;
  callToggle = new Subject();
  reloadToggle = new Subject();
  closedToggle = new Subject();
  constructor(private httpClient: HttpClient) {
    //this.baseUrl = 'https://ttq3pdorjg.execute-api.us-east-2.amazonaws.com/Prod/api/passwords';
    //this.baseUrl="https://localhost:5001/api/passwords"
    if (isDevMode())
      this.baseUrl = 'https://localhost:5001/api/passwords';
    else
      this.baseUrl = 'https://ttq3pdorjg.execute-api.us-east-2.amazonaws.com/Prod/api/passwords';

   }

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
    //console.log('busqueda: '+buscar)
    if(buscar=='')
    {
      newURL = `${this.baseUrl}?orden=${orden}&tipo_orden=${tipo_orden}&pagina=${pPage}&registros_por_pagina=10`;
    }
    else
    {
      newURL = `${this.baseUrl}?buscar=${buscar}`;
    }
    
    console.log(newURL);
    return this.httpClient.get<any>(newURL, httpOptions).toPromise();
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


  create(password: any): Promise<Password[]>{
    debugger;
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    // formato de ingreso
    let userID = parseInt(password.UserID);
    let newUser = new Password(0, password.Sitio, password.Password, password.Fecha, password.Activo, userID);
    let response = this.httpClient.post<any>(this.baseUrl, newUser, httpOptions).toPromise();
    //console.log(response);
    return response;
  }

  update(password: any): Promise<any[]>{
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
     // formato de ingreso
     let userID = parseInt(password.UserID);
     let editPassword = new Password(0, password.Sitio, password.Password, password.Fecha, password.Activo, userID);
    //console.log(editUser);
    const result = this.httpClient.put<any>(this.baseUrl, editPassword,  httpOptions).toPromise();
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
