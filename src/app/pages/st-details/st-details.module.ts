import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StDetailsPageRoutingModule } from './st-details-routing.module';

import { StDetailsPage } from './st-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StDetailsPageRoutingModule
  ],
  declarations: [StDetailsPage]
})
export class StDetailsPageModule {}
