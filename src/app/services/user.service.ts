import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  invokeMyMethod = new EventEmitter();
  invokeMyNewMethod = new EventEmitter();
  baseUrl: string;
  user: Users[];
  constructor(private httpClient: HttpClient) {
    //this.baseUrl = 'https://8d1obz8j0j.execute-api.us-east-2.amazonaws.com/Prod/api/users';
    this.baseUrl="https://localhost:44336/api/users"
    this.user =[]; 
   }//inyeccion de cliente

   changeMessage(message: string) {
    this.messageSource.next(message)
  }


   getAll(): Promise<any[]>{
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    return this.httpClient.get<any[]>(this.baseUrl, httpOptions).toPromise();
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


  create(user: any): Promise<any[]>{
    debugger;
    const bodyRequest = user;
    let session:any = localStorage.getItem('user');
    let token = JSON.parse(session);
    let tokenFormat = 'Bearer '+token["token"]
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':tokenFormat
      })
    }
    
    console.log(bodyRequest)
    return this.httpClient.post<any>(this.baseUrl, bodyRequest, httpOptions).toPromise();
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
    const result = this.httpClient.put<any>(`${this.baseUrl}`, bodyRequest,  httpOptions).toPromise();
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

  callMyMethod(params: any) {
    this.invokeMyMethod.emit(params);
  }

  callMyNewMethod() {
    this.invokeMyNewMethod.emit();
  }
}
