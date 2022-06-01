import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss'],
})
export class CameraModalComponent implements OnInit {

  codBarras
  scanner = true

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  back() {
    this.modalController.dismiss()
  }

  edit(){
    this.scanner = !this.scanner
  }

  emitValue(){
    this.modalController.dismiss({
      cod: this.codBarras
    })
  }

}
