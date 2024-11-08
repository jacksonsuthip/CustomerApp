import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  customerCode: number = 0;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Regex for numbers only
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
    this.customerCode = this.route.snapshot.params['id'];
    if (this.customerCode) {
      this.customerService.getCustomerByCode(this.customerCode).subscribe(customer => {
        this.customerForm.patchValue(customer);
      });
    } else {
      this.customerCode = 0;
    }
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
    const customer: Customer = this.customerForm.value;
    if (this.customerCode) {
      this.customerService.updateCustomer(this.customerCode, customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.customerService.addCustomer(customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }

  // Reset form method
  resetForm(): void {
    this.customerForm.reset();
  }
}
