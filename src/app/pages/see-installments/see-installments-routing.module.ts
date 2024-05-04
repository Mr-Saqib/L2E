import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeInstallmentsPage } from './see-installments.page';

const routes: Routes = [
  {
    path: '',
    component: SeeInstallmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeInstallmentsPageRoutingModule {}
