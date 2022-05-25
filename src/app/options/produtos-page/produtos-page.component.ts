import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CameraModalComponent } from 'src/app/shared/camera-modal/camera-modal.component';

@Component({
  selector: 'app-produtos-page',
  templateUrl: './produtos-page.component.html',
  styleUrls: ['./produtos-page.component.scss'],
})
export class ProdutosPageComponent implements OnInit {

  constructor(
    private navController: NavController,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  back(){
    this.navController.pop()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CameraModalComponent,
    });
    return await modal.present();
  }

}
