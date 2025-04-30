import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { AuthGuard } from './security/auth.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginPageComponent,
  },
  {
    path: 'acceuil',
    pathMatch: 'full',
    component: AcceuilComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'user'] },
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
