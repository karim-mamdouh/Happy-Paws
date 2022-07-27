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
//Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
//Services
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
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
  ],
  providers: [MessageService],
})
export class AuthModuleModule {}
