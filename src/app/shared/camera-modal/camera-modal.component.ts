import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.component.html',
  styleUrls: ['./camera-modal.component.scss'],
})
export class CameraModalComponent implements OnInit {

  codBarras
  scanner = false

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.startScanner()
  }

  back() {
    this.modalController.dismiss()
  }

  async startScanner() {
    const allowed = await this.checkPermission()
    if ( allowed ) {      
      BarcodeScanner.hideBackground();
      this.scanner = true;

      console.log("🚀 ~ file: camera-modal.component.ts ~ line 33 ~ CameraModalComponent ~ startScanner ~ this.scanner = true")
      
      const result = await BarcodeScanner.startScan();

      if ( result.hasContent ) {
        this.scanner = false;

        this.stopScanner()

        try {
          this.codBarras = result
          
          this.emitValue()
        } catch(e){
          this.presentError()
        }
      }
    }
  }

  async presentError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ERRO',
      message: 'Não foi possível ler o código de barras',
      buttons: ['OK']
    });

    await alert.present();
  }

  async checkPermission() {
    return new Promise( async (resolve, _) => {
      const status = await BarcodeScanner.checkPermission({force: true});
      if ( status.granted ) {
        resolve(true)
      } else if ( status.denied ) {
        const alert = await this.alertController.create({
          header: 'Erro nas Permissões',
          message: 'Por favor habilite as permissões de uso de câmera nas Preferências do seu celular',
          buttons: [{
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Abrir Preferências',
            handler: () => {
              resolve(false);
              BarcodeScanner.openAppSettings();
            }
          }]
        })
      } else {
        resolve(false)
      }
    })
  }

  stopScanner(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.scanner = false;
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
