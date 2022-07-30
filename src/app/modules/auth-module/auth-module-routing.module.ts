//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
//Components
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  //Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //Login route
  { path: 'login', component: LoginComponent },
  //Register route
  { path: 'register', component: RegisterComponent },
  //Profile route
  //, canActivate: [AuthGuard]
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthModuleRoutingModule {}
