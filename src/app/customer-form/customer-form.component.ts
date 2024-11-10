import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  customerCode: number = 0;
  customers: Customer[] = [];
  displayedColumns: any;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    const mobileNoPattern = /^[0-9]+$/;

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(mobileNoPattern)]],
      geoLocation: ['']
    });
  }

  ngOnInit(): void {
    // this.customerCode = this.route.snapshot.params['id'];
    if (this.customerCode) {
      this.customerService.getCustomerByCode(this.customerCode).subscribe(customer => {
        this.customerForm.patchValue(customer);
      });
    } else {
      this.customerCode = 0;
    }
    this.loadCustomers();
  }

  get name() {
    return this.customerForm.get('name');
  }
  get address() {
    return this.customerForm.get('address');
  }
  get email() {
    return this.customerForm.get('email');
  }
  get mobileNo() {
    return this.customerForm.get('mobileNo');
  }

  saveCustomer(): void {
    if (this.name?.invalid || this.address?.invalid || this.email?.invalid || this.mobileNo?.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    if (this.customers.find(customer =>
      customer.email.toLowerCase() === this.email?.value.toLowerCase() && customer.customerCode !== this.customerCode)) {
      Swal.fire(
        'Error!',
        'This email is already registered. Please use a different email.',
        'error'
      );
      return;
    }

    const customer: Customer = this.customerForm.value;
    if (this.customerCode) {
      this.customerService.updateCustomer(this.customerCode, customer).subscribe(() => {
        // this.router.navigate(['/customers']);
        this.loadCustomers();
        this.resetForm();
      });
    } else {
      this.customerService.addCustomer(customer).subscribe(() => {
        // this.router.navigate(['/customers']);
        this.loadCustomers();
        this.resetForm();
      });
    }
  }

  // Reset form method
  resetForm(): void {
    this.customerCode = 0
    this.customerForm.reset();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe(data => {
      this.customers = data;
    });
    this.customerCode = 0
  }

  editCustomer(customerCode: number): void {
    this.customerCode = customerCode
    this.customerService.getCustomerByCode(this.customerCode).subscribe(customer => {
      this.customerForm.patchValue(customer);
    })
  }

  deleteCustomer(customerCode: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(customerCode).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              'The customer has been deleted.',
              'success'
            );
            this.loadCustomers();
            this.resetForm();
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'Failed to delete customer. Please try again later.',
              'error'
            );
          }
        });
      }
    });
  }

  printCustomers() {
    this.customerService.printCustomers(this.customers).subscribe(response => {
      const blob = response as Blob;
      const url = window.URL.createObjectURL(blob);
      const printWindow = window.open(url, '_blank');
      printWindow?.print();
    });
  }

}
