import { HttpClient } from '@angular/common/http';
import { enableProdMode, Injectable, isDevMode } from '@angular/core';
import { Users } from '../models/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string;
  user: Users[];

  constructor(private httpClient: HttpClient) { 
    //this.baseUrl = 'https://ttq3pdorjg.execute-api.us-east-2.amazonaws.com/Prod/api/login/authenticate';
    
    console.log(isDevMode());
    if (isDevMode())
      this.baseUrl = 'https://localhost:5001/api/login/authenticate';
    else
      this.baseUrl = 'https://ttq3pdorjg.execute-api.us-east-2.amazonaws.com/Prod/api/login/authenticate';

    this.user = [];

  }

  login(user: any): Promise<any[]>{
    const bodyRequest = user;
    //enableProdMode();
    return this.httpClient.post<any>(this.baseUrl, bodyRequest).toPromise();
    
  }
}
