import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/Customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/Customer/customer-form/customer-form.component';

const routes: Routes = [
   { path: '', component: CustomerListComponent },
   { path: 'customers/add', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerFormComponent },
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
