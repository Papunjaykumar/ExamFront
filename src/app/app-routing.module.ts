import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';

const routes:Routes=[
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full', 
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:AdminDashboardComponent,
    pathMatch:'full',
    canActivate:[adminGuard],

  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[normalGuard]
  },
  
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
