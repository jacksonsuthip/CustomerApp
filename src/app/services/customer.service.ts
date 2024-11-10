import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:22963/api/customers';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerByCode(customerCode: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${customerCode}`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customerCode: number, customer: Customer): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${customerCode}`, customer);
  }

  deleteCustomer(customerCode: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${customerCode}`);
  }

  printCustomers(customers: Customer[]): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/print`, customers, { responseType: 'arraybuffer' }).pipe(
      map((response: ArrayBuffer) => {
        return new Blob([response], { type: 'application/pdf' });
      })
    );
  }
}
