import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogModuleRoutingModule } from './blog-module-routing.module';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';


@NgModule({
  declarations: [
    BlogCardComponent,
    BlogListComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    BlogModuleRoutingModule
  ]
})
export class BlogModuleModule { }
