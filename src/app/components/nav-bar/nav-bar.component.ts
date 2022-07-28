import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AnimalType } from 'src/app/interfaces/adoption';
import { ProductCategory } from 'src/app/interfaces/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  storeMenuItems: Array<MenuItem> = [
    {
      label: 'Cat',
      icon: 'fa-solid fa-cat',
      command: () => {
        this._router.navigate(['/store/products'], {
          queryParams: { animalType: AnimalType.Cat },
        });
      },
      items: [
        {
          label: 'Dry Food',
          command: () => {
            this._router.navigate(['/store/products'], {
              queryParams: {
                animalType: AnimalType.Cat,
                category: ProductCategory.Supplies,
              },
            });
          },
        },
        {
          label: 'Litter',
          command: () => {
            this._router.navigate(['/store/products'], {
              queryParams: {
                animalType: AnimalType.Cat,
                category: ProductCategory.Litter,
              },
            });
          },
        },
        {
          label: 'Grooming',
          command: () => {
            this._router.navigate(['/store/products'], {
              queryParams: {
                animalType: AnimalType.Cat,
                category: ProductCategory.Grooming,
              },
            });
          },
        },
      ],
    },
    {
      label: 'Dog',
      icon: 'fa-solid fa-dog',
      command: () => {
        this._router.navigate(['/store/products'], {
          queryParams: { animalType: AnimalType.Dog },
        });
      },
      items: [
        {
          label: 'Dry Food',
          command: () => {
            this._router.navigate(['/store/products'], {
              queryParams: {
                animalType: AnimalType.Dog,
                category: ProductCategory.Supplies,
              },
            });
          },
        },
        {
          label: 'Litter',
          command: () => {
            this._router.navigate(['/store/products'], {
              queryParams: {
                animalType: AnimalType.Dog,
                category: ProductCategory.Litter,
              },
            });
          },
        },
        {
          label: 'Grooming',
          command: () => {
            this._router.navigate(['/store/products'], {
              queryParams: {
                animalType: AnimalType.Dog,
                category: ProductCategory.Grooming,
              },
            });
          },
        },
      ],
    },
  ]; // Store navbar menu items
  userMenuItems: Array<MenuItem> = []; // User profile menu items

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.userMenuItems = [{ items: this.getUserItems() }];
  }
  // Function that fills user menu items data based on existance of token in local storage
  getUserItems(): Array<MenuItem> {
    let items: Array<MenuItem> = [];
    let token = localStorage.getItem('token');
    if (token) {
      items = [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: () => {
            this._router.navigate(['/auth/profile']);
          },
        },
        {
          label: 'Cart',
          icon: 'pi pi-shopping-cart',
          command: () => {
            this._router.navigate(['/store/cart']);
          },
        },
        {
          label: 'Wishlist',
          icon: 'pi pi-heart-fill',
          command: () => {
            this._router.navigate(['/store/wishlist']);
          },
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            this.logout();
          },
        },
      ];
    } else {
      items = [
        {
          label: 'Sign In',
          icon: 'pi pi-sign-in',
          command: () => {
            this._router.navigate(['/auth']);
          },
        },
        {
          label: 'Sign Up',
          icon: 'pi pi-user-plus',
          command: () => {
            this._router.navigate(['/auth/register']);
          },
        },
      ];
    }
    return items;
  }
  // Function that logs user out and reloads app
  logout(): void {
    this._authService.logout().then((response) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      window.location.href = '/';
    });
  }
}
