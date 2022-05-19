import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsPage } from './options.page';
import { ProdutosPageComponent } from './produtos-page/produtos-page.component';

const routes: Routes = [
  {
    path: '',
    component: OptionsPage
  },
  {
    path: 'produtos',
    component: ProdutosPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsPageRoutingModule {}
