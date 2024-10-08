import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryDetailsFormRoutingModule } from './salary-details-form-routing.module';
import { SalaryDetailsFormComponent } from './salary-details-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SalaryDetailsFormComponent
  ],
  imports: [
    CommonModule,
    SalaryDetailsFormRoutingModule,
    ReactiveFormsModule
  ]
})
export class SalaryDetailsFormModule { }
