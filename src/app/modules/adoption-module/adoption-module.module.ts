//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AdoptionModuleRoutingModule } from './adoption-module-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
//Components
import { AnimalsListComponent } from './components/animals-list/animals-list.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { AnimalDetailsComponent } from './components/animal-details/animal-details.component';

@NgModule({
  declarations: [
    AnimalsListComponent,
    AnimalCardComponent,
    AnimalDetailsComponent,
  ],
  imports: [
    ProgressSpinnerModule,
    CommonModule,
    AdoptionModuleRoutingModule,
    ImageModule,
    ButtonModule,
    DialogModule,
  ],
})
export class AdoptionModuleModule {}
