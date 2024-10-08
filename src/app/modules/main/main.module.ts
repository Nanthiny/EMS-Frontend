import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderModule } from '../components/header/header.module';





@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule

  ],

})
export class MainModule { }
