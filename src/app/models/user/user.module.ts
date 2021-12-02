export class Users{
  id: number;
  name: string;
  password: string;
  email: string;
  userRoleID: number;
  token: string;

  constructor(pId:number, pName: string, pPassword:string, pEmail:string, pUserRoleID:number, pToken:string)
  {
      this.id = pId;
      this.name = pName;
      this.email = pEmail;
      this.userRoleID = pUserRoleID;
      this.password =pPassword;
      this.token = pToken;
  }
}