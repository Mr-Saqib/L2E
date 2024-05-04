import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ModalController } from '@ionic/angular';
import { ToastService } from '../core/toasts/toast.service';
import { AlertService } from '../core/alerts/alert.service';
import { GlobalService } from '../core/global.service';
import { ApiService } from '../core/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit, AfterViewInit{

  public student_details:any; 
  refresher=false;
  res:any; 
  total: any = 0;
  public activeCounter: any = 0;
  public deactiveCounter: any = 0;
  public data: any;
  leaveCounter: any = 0;
  public allstudentdetails: any;
  getusebyfilter: any;
  pending_FeeSt: any = 0;
  complete_FeeSt: any = 0;
  public student_Installments:any[] = [];
  public installmentsBackup:any[] = [];

  c_id : any = 1 ;


  constructor(private menu: MenuController,public route:Router,public toast:ToastService,
    public modalController: ModalController,public alert:AlertService,
    private animationCtrl: AnimationController,
    public global:GlobalService,public ApiCall:ApiService) {
    this.menu.enable(true);
  }

  async  ngOnInit() {
    let user:any = localStorage.getItem('l2e-login');
      user = JSON.parse(user)
        this.data = user;
    await  this.Get_Students();
       this.ApiCall.GetStudents(this.data.c_id)

   this.Get_Installments();

   
     this.ApiCall.GetInstallments(this.data.c_id);


   this.menu.enable(true);

   }
   public ngAfterViewInit(): void {
    this.Get_Installments();
   }
  home(){
    this.route.navigate(['home']);
  }
  // Student Get Method
  async Get_Students(){

    //  this.ApiCall.GetStudents(this.data.c_id);
      await  this.global.GetStudent.subscribe(res=>{
        console.log(res);
        this.student_details = res;
        console.log(this.student_details);
        this.getusebyfilter = res;
        this.total = res.length;
      });
  
      await  this.global.Active.subscribe( res => {
        this.activeCounter =res;
        console.log(res)
      });
  
      await this.global.Deactive.subscribe( res => {
        this.deactiveCounter =res;
        console.log(res)
      } );
      this.global.Leave.subscribe( res => {
        this.leaveCounter =res;
        console.log(this.deactiveCounter)
      } );
    }

    async Get_Installments(){
      let user:any = localStorage.getItem('l2e-login');
      user = JSON.parse(user)
        this.data = user;
        this.ApiCall.GetInstallments(this.data.c_id);
     this.ApiCall.GetInstallments(this.data.c_id);
      await  this.global.Pending_fee.subscribe( res => {
        this.pending_FeeSt =res;
      });

      await  this.global.Complete_fee.subscribe( res => {
        this.complete_FeeSt =res;
      });

    }

    refresh(){
      this.refresher=true
      setTimeout(() => {
        this.refresher=false,
        this.ApiCall.GetInstallments(this.data.c_id);
        this.ApiCall.GetStudents(this.data.c_id)
        this.Get_Installments();
        this.Get_Students();
      }, 1500 ); 
    }
  

}
