import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { baseUrl } from '../api/base.url';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carSource = new BehaviorSubject<any[]>([]);
  cars$ = this.carSource.asObservable();  public accessToken ='';

  public headers :HttpHeaders;

  constructor(private http: HttpClient,private userMangementServ:StorageService) { }


  getHeaders():HttpHeaders{
    this.accessToken = JSON.parse(this.userMangementServ.getCurrentUser()).accessToken;
    console.log(this.accessToken,"acctoken")

    console.log("token",this.accessToken)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    })
  }
  

  getAll() {
    const headers = this.getHeaders();
   
    return this.http.get<Car[]>(`${baseUrl}/car/display-cars`,{headers});
    
  }

  




  getCars() {
    const headers = this.getHeaders();

    return this.http.get<any[]>(`${baseUrl}/car/display-cars`,{headers}).subscribe(data => {
      this.carSource.next(data);
    })


  }


  get(id: any) :Observable<Object> {
    return this.http.get(`${baseUrl}/car/get-car/${id}`);
  } 

  create(data: any) {
    const headers = this.getHeaders();

    return this.http.post(`${baseUrl}/car/add-car`,data,{headers}).pipe(tap((newCar) =>{
      const cars = this.carSource.value;
      cars.push(newCar);
      this.carSource.next(cars);
    }))
    ;
  }

  update(id: any, data: any): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put(`${baseUrl}/car/update-car/${id}`, data,{headers});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/car/delete-car/${id}`).pipe(tap(()=> {
      const newData = this.carSource.value.filter(item => item._id !==id);

      this.carSource.next(newData);
    }))}
   


  findByTitle(title: any): Observable<Car[]> {
    return this.http.get<Car[]>(`${baseUrl}?title=${title}`);
  }
}



