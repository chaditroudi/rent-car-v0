
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { CarService } from "src/app/core/services/car.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  cars :any[] = [];
  carsRented:any[] = [];
  carsA:any[] = [];


  
  constructor(
  
    private carService:CarService
  
  ) {
  }



  

  ngOnInit(): void {
    this.carService.getCars();

    this.carService.cars$.subscribe((data) => {
      this.cars = data;
      this.cars.map(car => {

        if (car.rented == true) {
                  this.carsRented.push(car);
                }else 
                this.carsA.push(car);
      })


    });    


 
  }

}
