import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CheckboxModule } from 'primeng/checkbox';

import { StoreModuleRoutingModule } from './store-module-routing.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { FilterationComponent } from './components/filteration/filteration.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductsComponent,
    CartComponent,
    WishlistComponent,
    FilterationComponent,
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
    VirtualScrollerModule,
    CheckboxModule,
  ],
})
export class StoreModuleModule {}
