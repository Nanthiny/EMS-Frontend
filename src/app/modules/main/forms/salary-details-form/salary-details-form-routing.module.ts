import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryDetailsFormComponent } from './salary-details-form.component';

const routes: Routes = [{ path: '', component: SalaryDetailsFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryDetailsFormRoutingModule { }
