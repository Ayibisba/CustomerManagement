import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../../../../../customerManagement-frontend/src/app/services/customer.service';
import { Customer } from './../../../../../../customerManagement-frontend/src/app/models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  deleteCustomer(id: number): void {
    if (confirm('Supprimer ce client ?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }
}
