import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRoles } from '../models/user-roles/user-roles.module';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  baseUrl: string;
  userroles: UserRoles[];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://8d1obz8j0j.execute-api.us-east-2.amazonaws.com/Prod/api/user_roles';
    this.userroles =[]; 
   }

   getAll(): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl).toPromise();
  }

  //observable
  getById(pId: number): Promise<any> { // UN UNICO OBJETO
    return this.httpClient.get<any>(`${this.baseUrl}/${pId}`).toPromise();

  }

  create(userroles: any): Promise<any[]>{
    const bodyRequest = userroles;
    return this.httpClient.post<any>(this.baseUrl, bodyRequest).toPromise();
  }

  update(userroles: any): Promise<any[]>{
    const bodyRequest = userroles;
    const id = userroles.id;
    const result = this.httpClient.put<any>(`${this.baseUrl}/${id}`, bodyRequest).toPromise();
    return result;
  }


  delete(pId: number): Promise<any[]>{
    debugger;
    return this.httpClient.delete<any>(`${this.baseUrl}/${pId}`).toPromise();
  }
}
