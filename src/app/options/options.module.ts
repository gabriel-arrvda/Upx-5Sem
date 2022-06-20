import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsPageRoutingModule } from './options-routing.module';

import { OptionsPage } from './options.page';
import { ProdutosPageComponent } from './produtos-page/produtos-page.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { SharedModule } from '../shared/shared.module';
import { CameraComponent } from './camera/camera.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OptionsPageRoutingModule,
    SharedModule
  ],
  declarations: [
    OptionsPage, 
    ProdutosFormComponent,
    ProdutosPageComponent,
    CameraComponent
  ]
})
export class OptionsPageModule {}
