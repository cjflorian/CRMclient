export class Users{
  Id: number;
  Name: string;
  Password: string;
  Email: string;
  UserRoleID: number;
  constructor(pId:number, pName: string, pPassword:string, pEmail:string, pUserRoleID:number)
  {
      this.Id = pId;
      this.Name = pName;
      this.Email = pEmail;
      this.Password =pPassword;
      this.UserRoleID = pUserRoleID;
  }
}