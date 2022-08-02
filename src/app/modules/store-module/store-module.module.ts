import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//PrimeNg Component
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';

//Components
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FilterationComponent } from './components/filteration/filteration.component';
import { StoreModuleRoutingModule } from './store-module-routing.module';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductsComponent,
    CartComponent,
    WishlistComponent,
    ProductCardComponent,
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
    CardModule,
    CheckboxModule,
    PaginatorModule,
    MultiSelectModule,
  ],
})
export class StoreModuleModule {}
