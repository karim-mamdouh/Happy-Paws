import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';

const routes: Routes = [
  //Default route
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  //Articles route
  { path: 'articles', component: BlogListComponent },
  //Article details route
  { path: 'details', component: BlogDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogModuleRoutingModule {}
