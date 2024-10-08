import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentFormRoutingModule } from './department-form-routing.module';
import { DepartmentFormComponent } from './department-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DepartmentFormComponent
  ],
  imports: [
    CommonModule,
    DepartmentFormRoutingModule,
    ReactiveFormsModule,

  ],
  exports:[DepartmentFormComponent]
})
export class DepartmentFormModule { }
