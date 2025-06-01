import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from './../../../../../../customerManagement-frontend/src/app/services/customer.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, FormsModule,  RouterModule],
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  displayedCustomers: Customer[] = []; // Les clients À AFFICHER après recherche
  searchTerm: string = '';    // Ce que l'utilisateur tape

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllCustomers();
  }
  
  // Récupère TOUS les clients au démarrage
  getAllCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (res : any) => {
        console.log('Données reçues :', res); 
        this.customers = res?.data || [];
        this.displayedCustomers = this.customers; 
      },
      error: (err) => {
        console.error('Erreur API :', err);
      }
    });
  }
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
     next: () => {
          console.log('Client supprimé avec succès');
          this.getAllCustomers();
        },
      error: (err) => console.error('Erreur suppression :', err)
    });
  }
  

   // Cette fonction FILTRE les clients déjà chargés
  searchCustomer() {
    if (!this.searchTerm.trim()) {
      // Si rien de tapé, on affiche tout
      this.displayedCustomers = this.customers;
    } else {
      // On filtre les clients selon ce qui est tapé
      this.displayedCustomers = this.customers.filter(customer =>
        customer.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.phone?.toLowerCase().includes(this.searchTerm.toLowerCase()) 
       );
    }
  }
  trackById(index: number, customer: Customer): number {
  return customer.id;
}

}
