import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StAdmPageRoutingModule } from './st-adm-routing.module';

import { StAdmPage } from './st-adm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StAdmPageRoutingModule
  ],
  declarations: [StAdmPage]
})
export class StAdmPageModule {}
