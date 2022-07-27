import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { StoreModuleRoutingModule } from './store-module-routing.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductsComponent,
    CartComponent,
    WishlistComponent,
  ],
  imports: [
    CommonModule,
    StoreModuleRoutingModule,
    ImageModule,
    RatingModule,
    ButtonModule,
    CarouselModule,
    FormsModule,
    InputTextareaModule,
    ToggleButtonModule,
  ],
})
export class StoreModuleModule {}
