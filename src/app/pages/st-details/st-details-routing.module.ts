import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StDetailsPage } from './st-details.page';

const routes: Routes = [
  {
    path: '',
    component: StDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StDetailsPageRoutingModule {}
