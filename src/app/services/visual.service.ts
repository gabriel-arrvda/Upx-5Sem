import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({ 
  providedIn: 'root'
})

export class VisualService {

  public isPresented: boolean = false;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async genericToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async genericLoading(msg?) {
    const loading = await this.loadingController.create({
      message: msg ? msg : 'Aguarde...',
    });

    this.isPresented = true
    await loading.present();

    loading.onDidDismiss().then(() => {
      this.isPresented = false
    })
  }

  async genericConfirm(header, msg){
    let response
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            response = false
            return false
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            response = true
            return true
          }
        }
      ]
    });

    await alert.present();

    return alert.onDidDismiss().then(() => {
      return response
    })
  }

  closeLoading(){
    this.loadingController.dismiss()
  }

  setForegroundColor(color: string) {
    let rgb = this.hexToRgb(color)
    var sum = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
    return (sum > 128) ? 'black' : 'white';
  }

  hexToRgb(hexColor: string) {
    if (hexColor.charAt(0) === '#') {
      hexColor = hexColor.substr(1)
    }

    if (hexColor.length < 2 || hexColor.length > 6) {
      return false;
    }

    let values = hexColor.split('')
    let r, g, b

    if (hexColor.length === 2) {
      r = parseInt(values[0].toString() + values[1].toString(), 16);
      g = r;
      b = r;
    } else if (hexColor.length === 3) {
      r = parseInt(values[0].toString() + values[0].toString(), 16);
      g = parseInt(values[1].toString() + values[1].toString(), 16);
      b = parseInt(values[2].toString() + values[2].toString(), 16);
    } else if (hexColor.length === 6) {
      r = parseInt(values[0].toString() + values[1].toString(), 16);
      g = parseInt(values[2].toString() + values[3].toString(), 16);
      b = parseInt(values[4].toString() + values[5].toString(), 16);
    } else {
      return false;
    }
    
    return [r, g, b];
  }

}