import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { FilterationComponent } from './components/filteration/filteration.component';
import { CartComponent } from './components/cart/cart.component';
import { SmallFilterComponent } from './components/small-filter/small-filter.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'wishlist', canActivate: [AuthGuard], component: WishlistComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'filter', component: FilterationComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: 'smallfilter', component: SmallFilterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreModuleRoutingModule {}
