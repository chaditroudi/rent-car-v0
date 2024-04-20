import { ReportService } from "./../../core/services/report.service";

import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { CarService } from "src/app/core/services/car.service";
import { Report } from "src/app/core/models";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];
  carsRented: any[] = [];
  carsA: any[] = [];
  monthlyRep :any[] = [];

  constructor(private reportService: ReportService,private router:Router) {}

  ngOnInit(): void {
   
    this.fetchReports();
    this.fetchMonthlyRep();
  }



  fetchReports() {
    this.reportService.fetchAllreports();

    this.reportService.reports$.subscribe((data:any) => {
      this.reports = data;
      
      

      this.carsRented = data.rentedCars || [];
      this.carsA = data.availableCars || [];
   

    });
  }

  fetchMonthlyRep() {
    this.reportService.fetchMonthlyRep();

    this.reportService.reports$.subscribe((data:any) => {
      this.reports = data;
      

      this.monthlyRep = data || [];
      console.log("hgggggggggg",this.monthlyRep)
   

    });
  }
  goToDetails() {
    this.router.navigate(['modules/cars/car-details'])

  }
}
