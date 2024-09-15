import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { OrderService } from 'src/app/Services/order.service';
import { UserServiceService } from 'src/app/user-service.service';
// Déclarez ou importez l'interface Order
// order.model.ts
export interface Order {
  id?: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  orderDate: string; // Adjust the type based on your actual date format
  totalAmount: number;
  status: string;
  employeeFirstName?:string;
  preparationDate?: string;

  employée_id?: any; // Make sure this field matches the backend response
  // Add other fields as needed
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  streetAddress?: string;
  mobileNumber?: string;
  email?: string;
  // Add other fields as necessary
}


@Component({
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.css']
})
export class ListCommandesComponent  implements OnInit {
  isAssigningEmployee: boolean = false;
  statusMessage: string = ''; // Property to hold the status message

  orders: Order[] = [];
  selectedOrder: any;
  employeeDetail: any;
  selectedOrderId: number | null = null;
  assignedEmployeeId: number | null = null; // Track the assigned employee ID

  constructor(private orderService: OrderService ,private userService : UserServiceService,private employeeService : EmployeeService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        
        console.log('gg', orders);
      },
      (error: any) => console.error('Error loading orders:', error)
    );
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId);
    });
  }
  updateOrderStatus(orderId: number, newStatus: string): void {
    console.log(orderId, newStatus)
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(
      () => {
        this.loadOrders(); // Reload orders after updating status
      },
      (error: any) => { // Explicitly defining error type
        console.error('Error updating order status:', error);
      }
    );
  }
 showOrderDetails(order: any) {
    this.selectedOrder = order;
    const modal = document.getElementById('orderDetailsModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeOrderDetails() {
    const modal = document.getElementById('orderDetailsModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  viewDetails(order: any): void {
    
    this.selectedOrderId = order.id; // Set the selected order ID
    if (order.employée_id) {
      this.employeeService.getEmployeeById(order.employée_id).subscribe({
        next: (response: any) => {
          this.employeeDetail = response;
        },
        error: (err: any) => {
          console.error('Error fetching employee details', err);
          this.employeeDetail = null; // Clear details if there's an error
        }
      });
    } else {
      this.employeeDetail = null; // Clear details if no employee assigned
    }
  }
  assignEmployeeToOrder(order: any): void {
    // Prevent further clicks if an operation is already in progress
    if (this.isAssigningEmployee) {
      return;
    }

    // Set the flag and message to indicate processing
    this.isAssigningEmployee = true;
    this.statusMessage = 'Assigning employee, please wait...';

    // Fetch the username from the JWT token
    let username = this.userService.getUserName(); // Using getUserName method from AuthService
    console.log("hh", username);
    
    if (!username) {
      console.warn('No logged-in user found');
      this.statusMessage = 'No logged-in user found'; // Set error message
      this.isAssigningEmployee = false; // Reset the flag
      return;
    }

    // Call the service method to update the order with the assigned employee (username)
    this.orderService.assignEmployeeToOrder(order.id, username).subscribe(
      response => {
        // Handle success
        console.log('Employee assigned successfully');
        this.statusMessage = 'Employee assigned successfully'; // Set success message
        this.loadOrders(); // Refresh the orders list or update the order locally
      },
      error => {
        // Handle error
        console.error('Error assigning employee', error);
        this.statusMessage = 'Error assigning employee, please try again.'; // Set error message
      },
      () => {
        // Reset the flag to allow further clicks
        this.isAssigningEmployee = false;
      }
    );
  }
  }
  

  
  


