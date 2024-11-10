import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatTableModule, MatIconModule, MatDialogModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  displayedColumns: any;
  isPrinting = false;
  isLoading = false;
  @ViewChild('CustomerPrintTable') printSection!: ElementRef;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.customerService.getAllCustomers()
      .subscribe({
        next: (data) => {
          this.customers = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Error!',
            text: 'Failed to load customer data. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
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
        this.customerService.deleteCustomer(customerCode)
          .subscribe({
            next: () => {
              Swal.fire(
                'Deleted!',
                'The customer has been deleted.',
                'success'
              );
              this.loadCustomers();
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
    this.customerService.printCustomers(this.customers)
      .subscribe(response => {
        const blob = response as Blob;
        const url = window.URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        printWindow?.print();
      });
  }
}
