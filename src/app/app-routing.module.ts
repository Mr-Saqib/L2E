import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'st-adm',
    loadChildren: () => import('./pages/st-adm/st-adm.module').then( m => m.StAdmPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'st-details',
    loadChildren: () => import('./pages/st-details/st-details.module').then( m => m.StDetailsPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'installments',
    loadChildren: () => import('./pages/installments/installments.module').then( m => m.InstallmentsPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'see-installments',
    loadChildren: () => import('./pages/see-installments/see-installments.module').then( m => m.SeeInstallmentsPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'add-amount',
    loadChildren: () => import('./pages/add-amount/add-amount.module').then( m => m.AddAmountPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'see-account',
    loadChildren: () => import('./pages/see-account/see-account.module').then( m => m.SeeAccountPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'add-team',
    loadChildren: () => import('./pages/add-team/add-team.module').then( m => m.AddTeamPageModule),
    // canActivate:[AuthGuard]
  },
  {
    path: 'team-detail',
    loadChildren: () => import('./pages/team-detail/team-detail.module').then( m => m.TeamDetailPageModule),
    // canActivate:[AuthGuard]
  }
  




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
