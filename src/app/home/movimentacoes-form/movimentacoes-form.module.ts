import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimentacoesFormPageRoutingModule } from './movimentacoes-form-routing.module';

import { MovimentacoesFormPage } from './movimentacoes-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovimentacoesFormPageRoutingModule
  ],
  declarations: [MovimentacoesFormPage]
})
export class MovimentacoesFormPageModule {}
