import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CameraModalComponent } from './shared/camera-modal/camera-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private modalController: ModalController,
  ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: CameraModalComponent,
    });
    return await modal.present();
  }
}
