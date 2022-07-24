//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  //Default Route
  {
    path: '',
    component: HomeComponent,
  },
  //Authentication Module Route
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth-module/auth-module.module').then(
        (module) => module.AuthModuleModule
      ),
  },
  //Store Module Route
  {
    path: 'store',
    loadChildren: () =>
      import('./modules/store-module/store-module.module').then(
        (module) => module.StoreModuleModule
      ),
  },
  //Blog Module Route
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/blog-module/blog-module.module').then(
        (module) => module.BlogModuleModule
      ),
  },
  //Adoption Module Route
  {
    path: '',
    loadChildren: () =>
      import('./modules/adoption-module/adoption-module.module').then(
        (module) => module.AdoptionModuleModule
      ),
  },
  //Not Found Route
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
