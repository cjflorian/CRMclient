export class Password {
  Id: number;
  Sitio: string;
  Password: string;
  Fecha: Date;
  Activo: Boolean;
  UserID: number;

  constructor(pId: number, pSitio: string, pPassword: string, pFecha: Date, pActivo:Boolean, pUserID: number) {
    this.Id = pId;
    this.Sitio = pSitio;
    this.Password = pPassword;
    this.Activo = pActivo;
    this.Fecha = pFecha;
    this.UserID = pUserID;
  }

}
