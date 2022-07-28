import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductsComponent } from './components/products/products.component';
import { FilterationComponent } from './components/filteration/filteration.component';

const routes: Routes = [
  { path: 'details', component: ProductDetailsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'filter', component: FilterationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreModuleRoutingModule {}
