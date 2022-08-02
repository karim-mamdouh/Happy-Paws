//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoggedInGuard } from 'src/app/guards/logged-in.guard';
//Components
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  //Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //Login route
  { path: 'login', canActivate: [LoggedInGuard], component: LoginComponent },
  //Register route
  {
    path: 'register',
    canActivate: [LoggedInGuard],
    component: RegisterComponent,
  },
  //Profile route
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModuleRoutingModule {}
