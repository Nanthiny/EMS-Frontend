import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { PopupModule } from '../../components/popup/popup.module';


@NgModule({
  declarations: [
    DepartmentsComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    NgxSpinnerModule,
    PopupModule
  ]
})
export class DepartmentsModule { }
