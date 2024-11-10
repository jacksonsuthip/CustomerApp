
# CustomerApp

## Overview
 It provides CRUD (Create, Read, Update, Delete) operations and a listing feature for customers

## Features
1. **Customer Listing Page**:
   - Displays a list of all customers.
   - Includes a button to print the customer list.

2. **CRUD Operations**:
   - Provides forms for adding, editing, and deleting customers.
   - Uses Angular Reactive Forms for form validation and data handling.

3. **Service Layer**:
   - A dedicated service to manage HTTP requests to a Web API, facilitating data interactions with the backend.
  

## Installation and Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/jacksonsuthip/CustomerApp.git
   cd CustomerApp
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and Angular CLI installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the Angular development server:
   ```bash
   ng serve
   ```
   The application will be accessible at `http://localhost:4200`.

# Integration Guide
To integrate your Angular app with the .NET backend, update the file `src/app/services/customer.service.ts`. 
On line 10, set the `private apiUrl` variable to the correct backend URL, including the host and port, like so:
```typescript
private apiUrl = 'http://localhost:5000/api/customers';
```
   
## Usage
- **Listing Customers**: Navigate to the customer listing page to view all customers.
- **Adding a Customer**: Click on "Add Customer" and fill out the form to create a new customer entry.
- **Editing a Customer**: Select a customer from the list to update their information.
- **Deleting a Customer**: Use the delete button on a selected customer to remove them from the list.
- **Print Customer List**: Click the "Print" button to print the list of customers.

## Project Structure
- `src/app/customer-list`: Contains the customer listing component.
- `src/app/customer-form`: Contains the components and forms for adding/editing customers.
- `src/app/services/customer.service.ts`: Service to handle HTTP requests to the backend.

