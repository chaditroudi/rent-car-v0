import { User } from "./../models/user.model";
import { baseUrl, httpOptions } from "./../api/base.url";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { StorageService } from "./storage.service";

interface AuthResponse {
  accessToken: string;
  expDate: string;
  email: string;
  name: string;
  role: number;
  msg: string;
  password: string;
  success:boolean;
  data:any;
  permission: {};
}

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private user: User;
  role =0;
  constructor(
    private router: Router,
    private http: HttpClient,
    private userMangementService: StorageService
  ) {
    
    if(userMangementService.getCurrentUser() && this.userMangementService !==undefined) {
      this.role = JSON.parse(userMangementService.getCurrentUser()).data.role;
      
    }
  }


  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${baseUrl}/auth/login`,
        { email: email, password: password },
        httpOptions
      )
      .pipe(
        tap((res) => {

          if(res.success) {

            console.log("res", res);
            console.log(this.userMangementService);
            this.userMangementService.setToken(res.accessToken);
            this.userMangementService.setCurrentUser(res);
            this.userMangementService.storeUserRole(res.data.role);
          }

          
        
        }),
        shareReplay() 
      );
  }

  // isLoggedIn() {
  //   const user = JSON.parse(localStorage.getItem("user")!) as User;
  //   const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  //   // const expDate = JSON.parse(sessionStorage.getItem('expiration'));
  //   if (user) {
  //     const token = accessToken;
  //     //    const sExpDate = expDate;
  //     //  console.log(new Date(sExpDate))
  //     if (token) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }


  



  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("user_connected");

    this.router.navigate(["account/login"]);
  }
}
