//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
//Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountDetailsComponent } from './components/profile/components/account-details/account-details.component';
import { AddressesComponent } from './components/profile/components/addresses/addresses.component';
import { MyPetsComponent } from './components/profile/components/my-pets/my-pets.component';
//Services
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AccountDetailsComponent,
    AddressesComponent,
    MyPetsComponent,
  ],
  imports: [
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    CalendarModule,
    DropdownModule,
    TooltipModule,
    PasswordModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    CommonModule,
    AuthModuleRoutingModule,
    InputTextareaModule,
  ],
  providers: [MessageService],
})
export class AuthModuleModule {}
