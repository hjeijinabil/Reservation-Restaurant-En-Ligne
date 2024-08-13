import { Component, OnInit } from '@angular/core';
import { AddUserService } from 'src/app/Services/add-user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{
  users: any[] = [];

  constructor(private userService: AddUserService) { }

  ngOnInit(): void {
    this.loadUsers;
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    console.log('Deleting user with ID:', userId);
    if (userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this.users = this.users.filter(user => user.id !== userId);
            alert('User deleted successfully');
          },
          (error) => {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
          }
        );
      }
    } else {
      alert('Invalid user ID');
    }
  }
  

}
