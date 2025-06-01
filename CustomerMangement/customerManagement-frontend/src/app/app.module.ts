import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './components/Customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/Customer/customer-form/customer-form.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomerListComponent,
    CustomerFormComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
