import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProductService } from 'src/app/Services/add-product.service';
import { AddUserService } from 'src/app/Services/add-user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any = {}; // Initialize user object

  constructor(
    private route: ActivatedRoute,
    private addUserService: AddUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if(userId)
    this.addUserService.getUserById(userId).subscribe((user) => {
      this.user = user;
    });
  }

  onSubmit(userForm: any) {
    if (userForm.valid) {
      this.addUserService.updateUser(this.user).subscribe((response) => {
        console.log('User updated successfully:', response);

        // Redirect or give feedback to the user
        this.router.navigate(['/list-user']);

      });
    }
  }
}