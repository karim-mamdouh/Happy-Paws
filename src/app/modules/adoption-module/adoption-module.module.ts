import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdoptionModuleRoutingModule } from './adoption-module-routing.module';
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';


@NgModule({
  declarations: [
    AnimalsListComponent,
    AnimalCardComponent,
    AnimalDetailsComponent
  ],
  imports: [
    CommonModule,
    AdoptionModuleRoutingModule
  ]
})
export class AdoptionModuleModule { }
