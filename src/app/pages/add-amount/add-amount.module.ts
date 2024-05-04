import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAmountPageRoutingModule } from './add-amount-routing.module';

import { AddAmountPage } from './add-amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAmountPageRoutingModule
  ],
  declarations: [AddAmountPage]
})
export class AddAmountPageModule {}
