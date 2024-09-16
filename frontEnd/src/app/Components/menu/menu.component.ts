import { Component, OnInit } from '@angular/core';
import { AddProductService } from 'src/app/Services/add-product.service';
import { CommandeService } from 'src/app/Services/commande.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderConfirmationModalComponent } from '../order-confirmation-modal/order-confirmation-modal.component';
import { UserServiceService } from 'src/app/user-service.service';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  orderDate: string;
  orderTime: string;
  status: string;
  totalAmount: number;
  catégories: string;
  orderItems: OrderItem[];
  preparationDate?: string;
}

export interface OrderConfirmationResult {
  confirmed: boolean;
  preparationDate?: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  orders: Order[] = [];
  newOrder: Order = {
    clientName: '',
    clientEmail: '',
    catégories: '',
    clientPhone: '',
    orderDate: '',
    orderTime: '',
    status: '',
    totalAmount: 0,
    orderItems: []
  };
  selectedOrder: Order | null = null;

  cart: { [key: string]: number } = {};
  totalPrice: number = 0;
  items: any[] = [];
  filteredItems: any[] = [];
  selectedCategory: string = 'all';
  deliveryFee: number = 0;
  categories: string[] = [];
  alertMessage: string | null = null;

  constructor(
    private productService: AddProductService,
    private orderService: CommandeService,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserServiceService // Inject the UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(category: string = 'all'): void {
    this.productService.getMenuItems(category).subscribe(
      (items: any[]) => {
        this.filteredItems = items;
        this.selectedCategory = category;
        this.categories = Array.from(new Set(items.map((item: { category: any; }) => item.category)));
      },
      (error: any) => {
        console.error('Error loading menu items:', error);
      }
    );
  }

  filterItems(category: string): void {
    this.selectedCategory = category;
    this.loadMenuItems(category);
  }

  addToCart(item: any): void {
    const description = item.description; // Use description as the key
    if (this.cart[description]) {
      this.cart[description]++;
    } else {
      this.cart[description] = 1;
    }
    this.calculateTotal();
  }

  removeFromCart(item: any): void {
    const description = item.description; // Use description as the key
    if (this.cart[description]) {
      this.cart[description]--;
      if (this.cart[description] === 0) {
        delete this.cart[description];
      }
    }
    this.calculateTotal();
  }

  getItemQuantity(item: any): number {
    return this.cart[item.description] || 0; // Use description as the key
  }

  calculateTotal(): void {
    this.totalPrice = Object.keys(this.cart).reduce((total, description) => {
      const item = this.filteredItems.find(i => i.description === description);
      return total + (item ? item.price * this.cart[description] : 0);
    }, 0);
  }

  processOrder(): void {
    const dialogRef = this.dialog.open(OrderConfirmationModalComponent, {
      data: {
        orderItems: Object.keys(this.cart).map(description => ({
          name: description,
          quantity: this.cart[description],
          price: this.filteredItems.find(i => i.description === description)?.price || 0
        })),
        totalPrice: this.totalPrice,
        deliveryFee: this.deliveryFee
      }
    });
  
    dialogRef.afterClosed().subscribe((result: OrderConfirmationResult) => {
      if (result?.confirmed) {
        const clientName = this.userService.getUserName() || 'Inconnu';
  
        const newOrder: Order = {
          clientName: clientName,
          clientEmail: '',
          catégories: '',
          clientPhone: '',
          orderDate: new Date().toISOString(),
          orderTime: new Date().toISOString(),
          status: 'En attente',
          totalAmount: this.totalPrice + this.deliveryFee,
          orderItems: Object.keys(this.cart).map(description => ({
            name: description,
            quantity: this.cart[description],
            price: this.filteredItems.find(i => i.description === description)?.price || 0
          })),
          preparationDate: result.preparationDate
        };
  
        if (this.orderService.isAuthenticated()) {
          this.orderService.placeOrder(newOrder).subscribe(
            (order: any) => {
              console.log('Commande passée avec succès:', order);
              this.resetCart();
  
              // Accédez à l'ID de la commande
              const orderId = order.id;
  
              if (result.preparationDate) {
                const prepDate = new Date(result.preparationDate);
                const now = new Date();
                const timeToAlert = prepDate.getTime() - 5 * 60 * 1000 - now.getTime();
                const alertDate = new Date(prepDate.getTime() - 5 * 60 * 1000).toLocaleString();
  
                let orderDetails = newOrder.orderItems.map(item =>
                  `${item.name}: ${item.quantity} x ${item.price} D`
                ).join(', ');
  
                // Inclure l'ID de la commande dans le message d'alerte
                this.alertMessage = `Merci d'avoir choisi notre restaurant AlOstedh. Votre commande ID ${orderId} a été reçue. Nous avons hâte de vous servir à l'heure prévue, à ${alertDate}. Détails de la commande : ${orderDetails}`;
              }
            },
            (error: any) => {
              console.error('Erreur lors de la passation de la commande:', error);
              this.alertMessage = 'Il y a eu un problème lors de la passation de votre commande. Veuillez réessayer plus tard.';
            }
          );
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        console.log('La commande n\'a pas été confirmée');
      }
    });
  }
  
  
  

  resetCart(): void {
    this.cart = {};
    this.totalPrice = 0;
  }
}
