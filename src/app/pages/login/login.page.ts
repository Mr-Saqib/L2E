import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSplitPane, MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/core/alerts/alert.service';
import { ApiService } from 'src/app/core/api.service';
import { GlobalService } from 'src/app/core/global.service';
import { ToastService } from 'src/app/core/toasts/toast.service';
import { set } from '../../localStorage/LocalStorage';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public login_data: any = { username: '', password: '', role: '', c_id: '' };

  @ViewChild('ionSplitPane') ionSplitPane!: IonSplitPane;

  public user_data: any;

  constructor(
    private menu: MenuController,
    public route: Router,
    public alert: AlertService,
    public toast: ToastService,
    public ApiCall: ApiService,
    public global: GlobalService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.menu.enable(false);
  }
  ngOnInit() {
    this.menu.enable(false);
  }

  async loginfirst() {
    console.log(this.login_data);
    await this.ApiCall.user_Login(this.login_data);
    this.global.Userlogin.subscribe((res) => {
      set('user', res?.user);
      this.login_data = res;
    });
  }
  public username: any;
  public password: any;
  incorrectAttempts: number = 0;
  showCountdown: boolean = false;
  countdown: number = 30;
  async login() {
    console.log('userName: ', this.username);
    console.log('password: ', this.password);
    if (this.username === 'admin') {
      if (this.password === '12345') {
        this.route.navigate(['home']);
      } else {
        this.incorrectAttempts++;
        if (this.incorrectAttempts >= 3) {
          this.showCountdown = true;
          this.countdownTimer();
          this.incorrectAttempts = 0; // Reset attempts
          const alert = await this.alertController.create({
            // header: 'Error',
            message: `Too many wrong attempts!! Please wait for ${this.countdown}s`,
            // cssClass: 'alrt',
            buttons: ['OK'],
          });
          alert.present();
        } else if (this.incorrectAttempts < 3) {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Your password is wrong!!',
            // cssClass: 'alrt',
            buttons: ['OK'],
          });
          alert.present();
        } else {
          // Move the button away on wrong credentials
        }
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Username is not available.',
        // cssClass: 'alrt',
        buttons: ['OK'],
      });
      alert.present();
    }
  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  countdownTimer() {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.resetCountdown();
      }
    }, 1000);
  }

  resetCountdown() {
    this.showCountdown = false;
    this.countdown = 30;
  }
  disableIonSplitPange() {
    this.ionSplitPane.disabled = true;
  }
  home() {
    this.route.navigate(['home']);
  }
}
