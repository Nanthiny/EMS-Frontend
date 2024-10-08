import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { ReactiveFormsModule } from '@angular/forms';


import { SalaryDetailsModule } from '../salary-details/salary-details.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PopupModule } from '../../components/popup/popup.module';


@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    SalaryDetailsModule,
    NgxSpinnerModule,
    PopupModule
  ]
})
export class EmployeesModule { }
