import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full' },
    { path: 'customers', component: CustomerListComponent },
    { path: 'customers/add', component: CustomerFormComponent },
    // { path: 'customers/edit/:id', component: CustomerFormComponent }
];
