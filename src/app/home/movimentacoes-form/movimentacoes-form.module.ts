import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimentacoesFormPageRoutingModule } from './movimentacoes-form-routing.module';

import { MovimentacoesFormPage } from './movimentacoes-form.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    MovimentacoesFormPageRoutingModule
  ],
  declarations: [MovimentacoesFormPage]
})
export class MovimentacoesFormPageModule {}
