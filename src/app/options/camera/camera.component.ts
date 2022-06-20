import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { VisualService } from 'src/app/services/visual.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  codBarras
  scanner = false

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private visualService: VisualService
  ) { }

  ngOnInit() {
    this.startScanner()
  }

  back() {
    this.stopScanner()
    this.navController.pop()
  }

  async startScanner() {
    this.visualService.cameraOpen = of(true)
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
          this.codBarras = result.content
          this.emitValue()
        } catch(e){
          this.presentError()
        }
      }
    }
  }

  async presentError() {
    const alert = await this.alertController.create({
      cssClass: 'bg-white',
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
          cssClass: 'bg-white',
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
    this.stopScanner()
    this.visualService.cameraOpen = of(false)
    this.navController.navigateForward(['/','configs', 'produtos', 'create', this.codBarras])
  }

  ionViewWillLeave(){
    this.stopScanner()
  }

}
