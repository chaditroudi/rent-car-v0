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
  permission: {};
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated: boolean = false;

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

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
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
          this.isAuthenticated = true;
          console.log("res", res);
          console.log(this.userMangementService);
          this.userMangementService.setToken(res.accessToken);
          this.userMangementService.setCurrentUser(res);
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


  isLoggedIn() {
    

    if(this.isAuthenticatedUser) {
      return true;
    }

    return false;

  }


  isAdmin() {
    return this.isLoggedIn()&& this.role == 1 ? true :false
  }

  isEditor() {
    return this.isLoggedIn() && this.role == 2 ? true :false
  }

  isViewer() {
    return this.isLoggedIn() && this.role == 3 ? true :false
  }

  logout() {
    localStorage.removeItem("user");
    this.isAuthenticated = false;
    this.router.navigate(["account/login"]);
  }
}
