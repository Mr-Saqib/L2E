import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSplitPane, MenuController } from '@ionic/angular';
import { ToastService } from './core/toasts/toast.service';
import { GlobalService } from './core/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('ionSplitPane') ionSplitPane!: IonSplitPane;
  constructor(public router:Router,private menu: MenuController,public toast:ToastService,private global: GlobalService) {
    const user:any = localStorage.getItem('l2e-login');
    const x = JSON.parse(user);
    this.global.set_user(x)
  }


  home(){
    this.router.navigate(['home']);
  }
  add_student(){
    this.router.navigate(['st-adm']);
  }
  see_student(){
    this.router.navigate(['st-details'])
  }
  add_installment(){
    this.router.navigate(['installments'])
  }
  see_installment(){
    this.router.navigate(['see-installments'])
  }
  login(){
    this.router.navigate(['/login'])
    this.toast.LogoutSuccessfull();
    this.ionSplitPane.disabled = true
    this.menu.enable(false);
  }
  see_account(){
    this.router.navigate(['see-account'])
  }
  add_team(){
    this.router.navigate(['add-team'])
  }
}
