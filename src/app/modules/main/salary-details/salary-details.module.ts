import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryDetailsRoutingModule } from './salary-details-routing.module';
import { SalaryDetailsComponent } from './salary-details.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { PopupModule } from '../../components/popup/popup.module';


@NgModule({
  declarations: [
    SalaryDetailsComponent
  ],
  imports: [
    CommonModule,
    SalaryDetailsRoutingModule,
    NgxSpinnerModule,
    PopupModule
  ]
})
export class SalaryDetailsModule { }
