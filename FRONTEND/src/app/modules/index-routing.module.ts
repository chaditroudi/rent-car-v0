import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarsListComponent } from "./cars/cars-list/cars-list.component";
import { CarDetailsComponent } from "./cars/car-details/car-details.component";
import { ContractDetailsComponent } from "./contract/contract-details/contract-details.component";
import { CustomersListComponent } from "./customers/customers-list/customers-list.component";
import { CustomerAddComponent } from "./customers/customer-add/customer-add.component";
import { ContractInvoiceComponent } from "./contract/contract-invoice/contract-invoice.component";
import { CustomerUpdateComponent } from "./customers/customer-update/customer-update.component";
import { PermissionsDetailsComponent } from "./permissions/permissions-details/permissions-details.component";
import { PermissionUpdateComponent } from "./permissions/permission-update/permission-update.component";
import { MainComponent } from "./dashboard/main/main.component";
import { ReportsComponent } from "./reports/reports.component";
import { AdminEditorGuard, AdminGuard, AuthGuard, EditorGuard, ViewerGuard } from "../core/guards/index";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "cars/car-details",
        component: CarDetailsComponent,
        canActivate: [AuthGuard,AdminEditorGuard]
      },
      {
        path: "dashboard",
        component: MainComponent,
        canActivate: [AuthGuard]

      },

      {
        path:"reports",
        component: ReportsComponent,
        canActivate: [AuthGuard,ViewerGuard]

      },

      {
        path:"cars/cars-list",
        component: CarsListComponent,
        canActivate: [AuthGuard,AdminEditorGuard]

      },
      {
        path:"customers/customers-list",
        component:CustomersListComponent,
        canActivate: [AuthGuard,AdminEditorGuard]

      },
      {
        path:"customers/customers-add",
        component:CustomerAddComponent,
        canActivate: [AuthGuard,AdminEditorGuard]

      },
      {
        path:"customers/customers-update/:id",
        component:CustomerUpdateComponent,
        canActivate: [AuthGuard,AdminGuard]

      },
    
      {
        path:"permissions/permissions-details",
        component: PermissionsDetailsComponent,
        canActivate: [AuthGuard,AdminGuard]

      },
      {
        path:"permissions/permissions-update/:id",
        component: PermissionUpdateComponent,
        canActivate: [AuthGuard,AdminGuard]

      },




      
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}