import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule ,FormBuilder, FormGroup, Validators

} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService, Customer } from './../../../../../../customerManagement-frontend/src/app/services/customer.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CustomerFormComponent implements OnInit {
   form!: FormGroup;
  isEditMode = false;
  customerId!: number;

   constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router

  ) {}

   ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      status: ['', Validators.required]
      });
          // Vérifie si c'est une modification
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.customerId = +id;
        this.customerService.getCustomerById(this.customerId).subscribe({
          next: (res: any) => {
            this.form.patchValue(res?.data);
          },
          error: (err) => console.error('Erreur chargement client :', err)
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    if (this.isEditMode) {
      this.customerService.updateCustomer(this.customerId, this.form.value).subscribe({
        next: () => {
          alert('Client modifié avec succès');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Erreur modification :', err)
      });
    } else {
      this.customerService.createCustomer(this.form.value).subscribe({
        next: () => {
          alert('Client ajouté avec succès');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Erreur ajout :', err)
      });
    }
  }
}
    
    