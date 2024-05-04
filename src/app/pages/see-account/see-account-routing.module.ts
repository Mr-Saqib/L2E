import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeAccountPage } from './see-account.page';

const routes: Routes = [
  {
    path: '',
    component: SeeAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeAccountPageRoutingModule {}
