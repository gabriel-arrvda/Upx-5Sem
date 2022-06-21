import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { VisualService } from 'src/app/services/visual.service';
import { CameraModalComponent } from 'src/app/shared/camera-modal/camera-modal.component';
import { of } from 'rxjs'
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-movimentacoes-form',
  templateUrl: './movimentacoes-form.page.html',
  styleUrls: ['./movimentacoes-form.page.scss'],
})
export class MovimentacoesFormPage implements OnInit {
  cameraOpen = false

  produtos: any[] = []

  constructor(
    private navController: NavController,
    private fbService: FirebaseService,
    private modalController: ModalController,
    private visualService: VisualService
  ) { }

  ngOnInit() {
    
  }

  save(){
    this.visualService.genericLoading().then( () => {
      this.fbService.saveSaida(this.produtos).then(() => {
        this.visualService.closeLoading()
        this.visualService.genericToast('Saida salva com sucesso')
        this.back()
      }).catch((err) => {
        this.visualService.closeLoading()
        this.visualService.genericToast(err)
      })
    })
  }

  async presentModal() {
    this.cameraOpen = true
    this.visualService.cameraOpen = of(true)

    const modal = await this.modalController.create({
      component: CameraModalComponent,
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss()

    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    
    if(data){
      this.cameraOpen = false
      this.visualService.cameraOpen = of(false)
      
      this.visualService.genericLoading().then( () => {
        this.fbService.getProduto(data.cod).then((produto) => {
          this.visualService.closeLoading()

          if(this.produtos.some((produto) => produto.id === produto.id)){
            this.visualService.genericToast("Produto já adicionado")
            return
          }

          this.produtos.push(produto)
        }).catch((err) => {
          this.visualService.closeLoading()
          this.visualService.genericToast(err)
        })
      })
    }

    return
  }

  back(){
    this.navController.pop()
    this.produtos = []
  }

  ionViewWillLeave(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  ionViewWillEnter(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan()
  }

}
