import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AnimalType } from 'src/app/interfaces/adoption';
import { ProductCategory } from 'src/app/interfaces/store';

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
        this._router.navigate(['/store'], {
          queryParams: { animalType: AnimalType.Cat },
        });
      },
      items: [
        {
          label: 'Dry Food',
          command: () => {
            this._router.navigate(['/store'], {
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
            this._router.navigate(['/store'], {
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
            this._router.navigate(['/store'], {
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
        this._router.navigate(['/store'], {
          queryParams: { animalType: AnimalType.Dog },
        });
      },
      items: [
        {
          label: 'Dry Food',
          command: () => {
            this._router.navigate(['/store'], {
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
            this._router.navigate(['/store'], {
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
            this._router.navigate(['/store'], {
              queryParams: {
                animalType: AnimalType.Dog,
                category: ProductCategory.Grooming,
              },
            });
          },
        },
      ],
    },
  ];
  userMenuItems: Array<MenuItem> = [{ items: this.getUserItems() }];

  constructor(private _router: Router) {}

  ngOnInit(): void {}
  getUserItems(): Array<MenuItem> {
    let items: Array<MenuItem> = [];
    let token = JSON.parse(localStorage.getItem('token')!);
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
  logout() {}
}
