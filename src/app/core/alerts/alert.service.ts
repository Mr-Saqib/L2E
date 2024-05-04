import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  constructor(private alertController: AlertController) { }


    // loginpage
    async Password_alert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        // subHeader: 'Important message',
        message: 'Check Your Name & Password ',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
    // net error totast
    async connection() {
      const alert = await this.alertController.create({
        header: 'Alert',
        // subHeader: 'Important message',
        message: 'Check your Internet Connection',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  

    async sure() {
      const alert = await this.alertController.create({
        header: 'Are You Sure',
        message: 'You Want To Add Data.',
        buttons: ['OK'],
       
      });
  
      await alert.present();
    }
}
