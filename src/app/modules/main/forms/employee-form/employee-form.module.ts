import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeFormRoutingModule } from './employee-form-routing.module';
import { EmployeeFormComponent } from './employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    EmployeeFormRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeFormModule { }
