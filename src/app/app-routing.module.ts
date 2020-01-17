import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { InsideComponent } from './inside/inside.component';
import { AuthGuard } from './auth/AuthGuard';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'inside', component: InsideComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
