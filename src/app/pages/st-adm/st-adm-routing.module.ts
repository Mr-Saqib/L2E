import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StAdmPage } from './st-adm.page';

const routes: Routes = [
  {
    path: '',
    component: StAdmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StAdmPageRoutingModule {}
