import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeInstallmentsPageRoutingModule } from './see-installments-routing.module';

import { SeeInstallmentsPage } from './see-installments.page';
import { DatePipe } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePipe,
    SeeInstallmentsPageRoutingModule,
    
  ],
  declarations: [SeeInstallmentsPage,]
})
export class SeeInstallmentsPageModule {}
