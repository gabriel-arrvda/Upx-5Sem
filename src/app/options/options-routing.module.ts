import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './camera/camera.component';

import { OptionsPage } from './options.page';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutosPageComponent } from './produtos-page/produtos-page.component';

const routes: Routes = [
  {
    path: '',
    component: OptionsPage
  },
  {
    path: 'produtos',
    component: ProdutosPageComponent
  },
  {
    path: 'produtos/camera',
    component: CameraComponent
  },
  {
    path: 'produtos/create/:id',
    component: ProdutosFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsPageRoutingModule {}
