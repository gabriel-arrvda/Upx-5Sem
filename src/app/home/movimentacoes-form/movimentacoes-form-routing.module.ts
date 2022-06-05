import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimentacoesFormPage } from './movimentacoes-form.page';

const routes: Routes = [
  {
    path: '',
    component: MovimentacoesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimentacoesFormPageRoutingModule {}
