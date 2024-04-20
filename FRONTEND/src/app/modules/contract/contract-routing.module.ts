import { ContractDetailsComponent } from "./contract-details/contract-details.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractBackupsComponent } from "./contract-backups/contract-backups.component";
import { ContractInvoiceComponent } from "./contract-invoice/contract-invoice.component";
import { AuthGuard } from "src/app/core/guards";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "contract/contract-details",
        component: ContractDetailsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1", "2"] },
      },

      {
        path: "contract/contract-backups",
        component: ContractBackupsComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1", "2"] },
      },
      {
        path: "contract-invoice/:id/:price",
        component: ContractInvoiceComponent,
        canActivate: [AuthGuard],
        data: { roles: ["1", "2"] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractRoutingModule {}
