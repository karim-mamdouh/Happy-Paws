//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';

const routes: Routes = [
  // Default route
  { path: '', redirectTo: 'animals', pathMatch: 'full' },
  // Animals route
  { path: 'animals', component: AnimalsListComponent },
  // Animal detail route
  { path: 'animal-detail', component: AnimalDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionModuleRoutingModule {}
