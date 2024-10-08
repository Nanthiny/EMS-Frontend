import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryDetailsComponent } from './salary-details.component';

const routes: Routes = [{ path: '', component: SalaryDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryDetailsRoutingModule { }
