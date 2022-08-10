//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//COmponents
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
//Guards
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  //Default route
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  //Product details route
  { path: 'details/:id', component: ProductDetailsComponent },
  //Wishlist route
  { path: 'wishlist', canActivate: [AuthGuard], component: WishlistComponent },
  //Proucts route
  { path: 'products', component: ProductsComponent },
  //Cart route
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreModuleRoutingModule {}
