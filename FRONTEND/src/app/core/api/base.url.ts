import { HttpHeaders } from "@angular/common/http";

export const baseUrl = 'http://localhost:3200/api';


export   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  
