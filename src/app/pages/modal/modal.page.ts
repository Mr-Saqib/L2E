import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/core/api.service';
import { GlobalService } from 'src/app/core/global.service';
import { ToastService } from 'src/app/core/toasts/toast.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  @Input() Category :any;
  @Input() Category2 :any;
  @Input() updateStudent :any;
  @Input() StudentDetails :any;
  @Input() FeeDetails :any;
  @Input() updateInstallments :any;
  @Input() updateAccount :any;
  @Input() Installment_details:any;


  public update : any;
  public Student:any
  public installments:any;
  
  

  public student_data:any;

  // update installments array
  public installments_update:any={c_id:'', date:'',i_amount:''}

  // update account array
  public Account:any={c_id:'', type:'',source:'',amount:'',date:''}
  public allInstallments: any;
  data: any;

  constructor(public modal: ModalController,private router: Router ,
     public apiCall: ApiService, public global: GlobalService,public toast:ToastService) { }



  ngOnInit() {
    this.update = this.Category;
    // update student
    this.student_data = this.updateStudent;
    console.log(this.student_data);
    

    // student details
    this.Student = this.StudentDetails;

    // studentinstallments details
    this.installments = this.FeeDetails;
    // get installment by student id
    this.allInstallments = this.Installment_details;
    console.log(this.allInstallments);
    
    
    // updateInstallments
    this.installments_update = this.updateInstallments;

    // update account
    this.Account = this.updateAccount;

    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data);
   });
  }

         
  // printdata(){
  //   window.print();
  //  }


  // StudentUpdate
 async Student_Update(){
    
    this.student_data.c_id = this.data.c_id;
    console.log(this.student_data);
   await  this.apiCall.UpdateStudents(this.student_data);
    this.Update_Student_close();
     this.toast.Student_Update_Successfull();
  }

  // installments update function
 async installment_update(){
    console.log(this.installment_update);
    // this.installment_update.c_id = this.data.c_id;
  await  this.apiCall.UpdateInstallments(this.installments_update);
    this.Update_Installment_close();
    this.toast.Installment_Update_Successfull();
  }

  // Account_update function
 async Account_update(){
    console.log(this.Account);
    this.Account.c_id = this.data.c_id;
  await  this.apiCall.Update_Account(this.Account);
    this.Update_Account_close();
    this.toast.Account_Update_Successfull();
  }

    // Get_Installments function
    async Get_Installments(data: any){
      const x = {id:data, c_id:this.data.c_id}
     await   this.apiCall.get_InstallmentsbyStudentId(x);
      await this.global.StudentIdinstallment.subscribe(res => {
        console.log(res);
        this.allInstallments = res;
        // console.log(this.total);
      });
    }
    // delete installments function
    async DeleteInstalments(i_id: any){
      const x = {i_id:i_id,c_id:this.data.c_id}
     await  this.apiCall.Delete_Installments(x);
     this.Get_Installments(this.data.c_id);
      console.log(i_id);
     await this.toast.Student_Delete_Successfull();
     this.Update_Installment_close();
    }


 Update_Student_close() {
  this.modal.dismiss(null, 'update-staus')
  }
 Update_Installment_close() {
    this.close();
  }
 Update_Account_close() {
    this.close();
  }

  seeStudentclose() {
    this.close();
  }

  close() {
    this.modal.dismiss(close).then(r => {
      console.log(r);
    });
  }

}
