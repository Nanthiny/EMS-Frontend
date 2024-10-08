import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './modules/main/main.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MainModule,
    HttpClientModule,
    ToastrModule.forRoot({     // ToastrModule added
      timeOut: 3000,           // Default timeout for toasts
      positionClass: 'toast-bottom-right', // Default position
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
