import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeAccountPageRoutingModule } from './see-account-routing.module';

import { SeeAccountPage } from './see-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeAccountPageRoutingModule
  ],
  declarations: [SeeAccountPage]
})
export class SeeAccountPageModule {}
