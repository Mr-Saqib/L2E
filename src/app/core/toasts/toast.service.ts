import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}
  // LoginSuccessfull

  async LoginSuccessfull() {
    const toast = await this.toastController.create({
      message: 'Your Login Successfully',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }
  // Logout Successfull

  async LogoutSuccessfull() {
    const toast = await this.toastController.create({
      message: 'Your LogOut Successfully',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  // StudentAdmiisionSuccessfull

  async StudentAdd() {
    const toast = await this.toastController.create({
      message: 'Student Added Successfull',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  async Fillform() {
    const toast = await this.toastController.create({
      message: 'Please fill the Form',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  // StudentDelete
  async Student_Delete_Successfull() {
    const toast = await this.toastController.create({
      message: 'Student Deleted Successfull',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  // Student_Update_Successfull
  async Student_Update_Successfull() {
    const toast = await this.toastController.create({
      message: 'Student Updated Successfull',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  // Installments_Successfull
  async Installments_Successfull() {
    const toast = await this.toastController.create({
      message: 'Installments Added Successfull',
      duration: 3000,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

    // Installment_Update_Successfull
    async Installment_Update_Successfull() {
      const toast = await this.toastController.create({
        message: 'Installment Updated Successfull',
        duration: 3000,
        cssClass: 'custom-toast',
        buttons: [
          {
            text: 'Dismiss',
            role: 'cancel'
          }
        ],
      });
  
      await toast.present();
    }

          // AccountAdded

      async AccountAdded() {
        const toast = await this.toastController.create({
          message: 'Account Data Added Successfull',
          duration: 3000,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });

        await toast.present();
      }

            // Account_Delete_Successfull
      async no_Data() {
        const toast = await this.toastController.create({
          message: 'We have no data',
          duration: 3000,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });

        await toast.present();
      }

            // Account_Update_Successfull
      async Account_Update_Successfull() {
        const toast = await this.toastController.create({
          message: 'Account Data Updated Successfull',
          duration: 3000,
          cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ],
        });
    
        await toast.present();
      }


}
