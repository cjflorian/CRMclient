import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  user: Users[];

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = 'https://8d1obz8j0j.execute-api.us-east-2.amazonaws.com/Prod/api/login/authenticate';
    this.user = [];

  }

  login(user: any): Promise<any[]>{
    const bodyRequest = user;
    return this.httpClient.post<any>(this.baseUrl, bodyRequest).toPromise();
  }
}
