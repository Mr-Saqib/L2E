import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/global.service';
import { ApiService } from 'src/app/core/api.service';
import { AlertService } from 'src/app/core/alerts/alert.service';
import { ToastService } from 'src/app/core/toasts/toast.service';
import { AnimationController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-st-details',
  templateUrl: './st-details.page.html',
  styleUrls: ['./st-details.page.scss'],
})
export class StDetailsPage implements OnInit {

  
  filterTerm!: string;

 
  public Category: any = 'Student' ;
  public Category2: any = 'feedetails';
  refresher=false;
  // public length:any;

  public student_details:any[] = [];
  res:any; 
  total: any;
  public activeCounter:any;
  public deactiveCounter:any;
  public installment_by_id:any;
  public byCourse:any={c_id:' ',course:'All'}
  public data: any;
  leaveCounter: any;
  public allstudentdetails: any;
  getusebyfilter: any;
  public selectFilter:any = {c_id: '', course:'', st_status:''};
  dataSource!: MatTableDataSource<any>;
  public installmentsBackup:any[] = [];
  c_id : any = 3 ;
  campus_students: any;


  constructor(public route:Router,public toast:ToastService,
     public modalController: ModalController,public alert:AlertService,
     private animationCtrl: AnimationController,
     public global:GlobalService,public ApiCall:ApiService,) { }

  async  ngOnInit() {
    await  this.Get_Students();
    this.global.Userlogin.subscribe(res => {
 
     this.data = res.user;
     if (this.data === undefined) {
       this.route.navigate(['/login'])
     }
     else {
       console.log(this.data);
       this.ApiCall.GetStudents(this.data.c_id)
       console.log(this.data.c_id)
     }
   });
   }
  home(){
    this.route.navigate(['home']);
  }

  searchItems(value : any){
    this.dataSource = new MatTableDataSource<any>(this.installmentsBackup);
    this.dataSource.filter = value.trim().toLowerCase();
    this.student_details = this.dataSource.filteredData
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
        this.installmentsBackup = res ;
        this.total = this.student_details;
        this.activeCounter = this.student_details.filter((x: { st_status: string; }) => x.st_status === 'active').length;
        this.deactiveCounter = this.student_details.filter((x: { st_status: string; }) => x.st_status === 'deactive').length;
        this.leaveCounter = this.student_details.filter((x: { st_status: string; }) => x.st_status === 'leave').length;
      });
  
      // await  this.global.Active.subscribe( res => {
      //   this.activeCounter =res;
      //   console.log(res)
      // });
  
      // await this.global.Deactive.subscribe( res => {
      //   this.deactiveCounter =res;
      //   console.log(res)
      // } );
      // this.global.Leave.subscribe( res => {
      //   this.leaveCounter =res;
      //   console.log(this.deactiveCounter)
      // } );
      
    }


  async refresh(){
    this.refresher=true
    setTimeout(() => {
      this.refresher=false,
      this.ApiCall.GetStudents(this.data.c_id);
      this.Get_Students();
    }, 1500 ); 
  }

  async seeDeatils(data: any) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 1 ,
      breakpoints: [1, 0.435, 0.93],
      componentProps: {
        'StudentDetails': data,
        'Category': "viewdetails",
      }
    });
    return await modal.present();
  }
  
  async updateModal(stdnt: any) {
    
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'updateStudent': stdnt,
        'Category': this.Category,
      }
    });
    console.log('modal')
   await modal.present();
   const {data, role} = await modal.onWillDismiss();
   if(role == 'update-staus') {
    this.Get_Students()
   }
  }

  // see_all_installment by student id
  async view_all_installment(item:any) {
    console.log(item);
    const x ={id:item.id, c_id:this.data.c_id}
    console.log(x);
    
    await this.ApiCall.get_InstallmentsbyStudentId(x)
    this.global.StudentIdinstallment.subscribe(res => {
      console.log(res);
      this.installment_by_id = res;
     });
     
     
   const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93 ,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        'Installment_details' : this.installment_by_id,
        'Category' : this.Category2,
      }
    });
    console.log('modal')
    return await modal.present();
  }
  // async  select_campus($event:any){
  //   console.log($event.target.value);
  //   this.selectFilter.c_id = $event.target.value;
  // }

  async select_student_Course($event:any){
    this.selectFilter.course = $event.target.value;
    console.log($event.target.value);
  
  }

 async  select_status($event:any){
    console.log($event.target.value);
    this.selectFilter.st_status = $event.target.value;
   
}
  filterdata(){
    this.selectFilter.c_id = this.data.c_id;
    console.log(this.selectFilter)
    this.ApiCall.getstudentfilter(this.selectFilter);
 
  }

 

}
