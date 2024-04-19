import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  private currentUser : User | null = null;
  private currentUserSource = new BehaviorSubject<User | null>(this.currentUser);
  public currentUser$:Observable<User | null> = this.currentUserSource.asObservable();

  role:number; 
  constructor() { 




  }


    setToken(accessToken:string) {

    sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
   // sessionStorage.setItem('expiration', JSON.stringify(expiration));

  }

  setCurrentUser(user:any) {
    this.currentUser = user;
    this.currentUserSource.next(this.currentUser);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser():any | null {
      return localStorage.getItem('user');
    
    
  }

 
    
}
