import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstallmentsPage } from './installments.page';

const routes: Routes = [
  {
    path: '',
    component: InstallmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstallmentsPageRoutingModule {}
