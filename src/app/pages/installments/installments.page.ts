import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { format } from 'date-fns';
import { AlertService } from 'src/app/core/alerts/alert.service';
import { ApiService } from 'src/app/core/api.service';
import { GlobalService } from 'src/app/core/global.service';
import { ToastService } from 'src/app/core/toasts/toast.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.page.html',
  styleUrls: ['./installments.page.scss'],
})
export class InstallmentsPage implements OnInit,  AfterViewInit {

  public student_details:any =[];  
  public All_Students:any = [];
  public show : any = false;
  public student_installments: any  = {id:'',c_id:'',m_id:'',payable_amount:''};
  next_install: any= 0;
  public installment_by_id:any[] = [];
  public install_no: any;

  public Category: any = 'feedetails';
  data: any;
  public current_instalment:any
  public installmentrdata: any;
  public current: any;

  constructor(public route:Router,public toast:ToastService,
    public modalController: ModalController,public alert:AlertService,
    public global:GlobalService,public ApiCall:ApiService,private config:NgSelectModule , public alertController: AlertController) { 
      
    }
  ngAfterViewInit(): void {
     
  }

    ngOnInit() {
      this.Get_Students();
      this.global.Userlogin.subscribe(res =>{
        this.data = res.user;
        if (this.data === undefined) {
          this.route.navigate(['/login'])
        }
        else {
          console.log(this.data);
          
        this.ApiCall.Get_StudentbyStatus(this.data.c_id);
        }
        console.log(this.data);
     });
    }
  
    home(){
      this.route.navigate(['home']);
    }
  
        // Student Get Method
async Get_Students(){
  // await  this.ApiCall.Get_StudentbyStatus();
    this.global.StatusStudent.subscribe(res => {
      console.log(res);
     this.All_Students = res;
   })
  }

  async select_student($event:any){
    console.log($event);
    const z = {id:$event}
    console.log(z);
    await  this.ApiCall.Get_InstallmentbyId(z);
    await  this.global.Idinstallment.subscribe(res=>{
      console.log(res);
      this.student_details = res[0];
      console.log(this.student_details)
    });
    console.log(this.student_installments)
    this.show = true;
  }

  // installment($event:any){
  //   console.log($event.target.value);
  //   const Y = $event.target.value;
  //   this.student_installments.remaning_amount =  this.student_details.total_fee - Y;  
  // }
  

    async Add_Installments(){
      
      console.log(this.student_installments);
     this.student_installments.id = this.student_details.id; 
     this.student_installments.c_id = this.student_details.c_id; 
     this.student_installments.m_id = this.student_details.m_id;
     this.student_installments.payable_amount  = this.student_details.installment_amount;
  const alert = await this.alertController.create({
    header: 'Are You Sure',
    message: 'DO You Want To Pay installment amount.',
    buttons: [{
      text: 'Okay',
      handler: async () => {
        await    this.ApiCall.Add_Installments(this.student_installments);
   await   this.toast.Installments_Successfull();
   this.student_installments= {c_id:'', id:'',remaning_amount:'',a_month:'',upcoming_installment:''};
   this.student_details={name:''};
   this.global.Userlogin.subscribe(res =>{
    this.data = res.user;
    console.log(this.data);
    this.ApiCall.GetInstallments(this.data.c_id);
 });
  await  this.route.navigate(['home']);
  },
  }]
   
  });

  await alert.present();
  
 }
 

 async view_all_installment(item:any) {
   const x = {id:item.id, c_id:item.c_id}
   await this.ApiCall.get_InstallmentsbyStudentId(x)
   this.global.StudentIdinstallment.subscribe(res => {
     console.log(res);
     this.installment_by_id = res;  
    });
    this.installmentrdata = this.installment_by_id.filter(x => (x.installment_no > 0))
  const modal = await this.modalController.create({
     component: ModalPage,
     cssClass: 'my-modal-class',
     initialBreakpoint: 0.93 ,
     breakpoints: [0, 0.435, 0.93],
     componentProps: {
       'Installment_details' : this.installmentrdata,
       'Category' : this.Category,
     }
   });
   console.log('modal')
   return await modal.present();
 }




}
