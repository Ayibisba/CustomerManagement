import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/customers'; 
  
  constructor(private http: HttpClient) {}

  // Obtenir tous les clients
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  //obtenri un cleint par son id 
  getCustomerById(id:number){
    return this.http.get<Customer[]>(`${this.apiUrl}/${id}`);
  }

   // Créer un client
  createCustomer(data: Customer): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Mettre à jour un client
  updateCustomer(id: number, data: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Supprimer un client
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Rechercher un client
  searchCustomer(query: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/search?query=${query}`);
  }
}