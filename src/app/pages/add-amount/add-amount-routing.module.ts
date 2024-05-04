import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAmountPage } from './add-amount.page';

const routes: Routes = [
  {
    path: '',
    component: AddAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAmountPageRoutingModule {}
