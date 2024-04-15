import { StatisticsService } from './../../../core/services/statistics.service';
import { Component, OnInit } from '@angular/core';
import * as data from "../../../shared/data/dashboard/default";
import { ContractService } from 'src/app/core/services/Contract.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  openContractCount:number = 0;
  closedContractCount:number = 0;

  



  countContractOpen() {
    this.statisService.countContractOpen().subscribe((data)=>{

      this.openContractCount = data;

    })
  }

  countContractClosed() {
    this.statisService.countContractClosed().subscribe((data)=>{

      this.closedContractCount = data;

    })

  }
  ngOnInit() {
    this.countContractOpen();
    this.countContractClosed();
   
  }

  public purchase = data.purchase
  public salesReturn = data.salesReturn
  public sales = data.sales
  public purchaseRate = data.purchaseRate


  constructor(private statisService:StatisticsService){}

    
   
}
