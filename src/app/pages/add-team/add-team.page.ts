import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/global.service';
import { ApiService } from 'src/app/core/api.service';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {
  public transaction: any;
  public accts: string | undefined;
  public data: any;
  public changesegment : any = 'Team';
  public isModalOpen = false;
  public isOpenExpenseModal = false;
  public isOpenExpensedetailModal = false;
  public isOpenseeExpensedetailModal = false;
  public isModalOpenmodeltr = false;
  appointment : any ;
  public team_details: any;
 public allexpenses: any;
  expensename: any;
 public allexpensedetail: any;
 public totalexpense: any = [];
 public total_debit: any = 0;
 public total_credit: any = 0;
 public totalnetbalance: any = 0;
  totalExpenseAmount: any;
  constructor( public global: GlobalService , public apiCall:ApiService , public route : Router, public datePipe: DatePipe , public alertController: AlertController) { }
  public custdetail: any  = {c_id:'', name: '', f_name: '',gender : '' , contact_no: '' , address:'' , cinic: ''}
  public account: any = {e_id: '' ,  debit : 0 , credit : 0 , description: '', c_id:''}
  public expenses : any ={c_id:'', name:''};
  public expensedetail : any ={ex_id:'', description:'', amount:'', date:'', c_id:''};
  public teamBill: any = { total_credit:'' , total_debit:'', total_netbalance:''}
  public filterDtata : any = { c_id: '', start:'', end:''}
  async ngOnInit() {
    await this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      this.account.c_id = this.data.c_id;
      console.log(this.data);
      this.expenses.c_id = this.data.c_id;
      this.expensedetail.c_id = this.data.c_id;
      this.getexpenses(this.data.c_id);
   });
   this.apiCall.api_transactionbycid(this.data.c_id);
   this.global.Transactiondetail.subscribe( res =>{
     console.log(res)
     this.teamBill = res;
   })
   this.Get_expenseamount();
   await  this.Get_Members();
  }

  async Get_expenseamount(){
   await this.apiCall.api_get_expamountonc_id(this.data.c_id);
    this.global.TotalExpenseAmount.subscribe( res =>{
     console.log(res)
     this.totalExpenseAmount = res;
   })
    }
  async Get_Members(){
    this.apiCall.Get_allteam(this.data.c_id);
      await  this.global.Getmembers.subscribe(res=>{
        console.log(res);
        this.team_details = res;
        console.log(this.team_details)
        
      });
    }

    
   // Open Update Modal
   setOpen(isOpen: boolean, data:any) {
    console.log(data)
    this.isModalOpen = isOpen;
    this.appointment = data;
  }
  setOpentrans(isOpen: boolean , data: any) {
   
    this.isModalOpenmodeltr = isOpen;
    this.account.e_id = data.e_id;
    console.log(this.account.e_id)
  }
  setCloseModel(isOpen: boolean){
    this.isModalOpenmodeltr = isOpen;
  }
  //  Update Appoinment
  async setClose(isOpen: boolean) {
    this.isModalOpen = isOpen;
    // await this.apiCall.api_UpdateAppointment(this.appointment);
  }
  // Close Update Modal
  async Close(isOpen: boolean) {
    const alert = await this.alertController.create({
      header: 'Are You Sure',
      message: 'DO You Want To Add Team Member.',
      buttons: [{
        text: 'Okay',
        handler: async () => {
          this.isModalOpen = isOpen;
          this.custdetail.c_id = this.data.c_id;
            console.log(this.custdetail);
           await  this.apiCall.insert_tmember(this.custdetail);
           this.Get_Members()
            this.custdetail ={c_id:'', name: '', f_name: '',gender : '' , contact_no: '' , address:'' , cinic: ''}
    },
    }]
     
    });

    await alert.present();

  }
  async addtransaction(isOpen: boolean){
    this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
    });
    this.account.c_id = this.data.c_id;
    console.log(this.account.c_id);
    const alert = await this.alertController.create({
      header: 'Are You Sure',
      message: 'DO You Want To Add Team Member.',
      buttons: [{
        text: 'Okay',
        handler: async () => {
          console.log(this.account)
          await  this.apiCall.insert_teamexpence(this.account);
          this.account = {c_id: '' ,  debit : '' , credit : '' , description: ''}
          this.isModalOpenmodeltr = isOpen;
    },
    }]
     
    });

    await alert.present();
   
  }

     // Open Update Modal
     setExpenseOpen(isOpen: boolean) {
      this.isOpenExpenseModal = isOpen;
    }

    async getexpenses(c_id : any) {
      await this.apiCall.api_getexpenses(c_id);
      this.global.Expenses.subscribe(expense=>{
        this.allexpenses = expense;
        console.log(this.allexpenses)
      })
    }

  async insertexpense(isOpen: boolean) {
   await this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
    });
    this.expenses.c_id = this.data.c_id;
    console.log(this.expenses)
    const alert = await this.alertController.create({
      header: 'Are You Sure',
      message: 'DO You Want To Add Expanse.',
      buttons: [{
        text: 'Okay',
        handler: async () => {
          await this.apiCall.api_insertexpense(this.expenses);
          this.expenses.name = '';
           this.getexpenses(this.data.c_id);
           this.setExpenseOpen(isOpen);
    },
    }]
    });
    await alert.present();
  
  }

       setExpensedetailOpen(isOpen: boolean, data : any) {
        this.expensedetail.ex_id = data.ex_id;
        this.expensename = data.name;
        this.isOpenExpensedetailModal = isOpen;
      }
       setExpensedetailclose(isOpen: boolean) {
        this.isOpenExpensedetailModal = isOpen;
      }

  async insertexpensedetail(isOpen: boolean) {
    await this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
    });
    this.expensedetail.c_id = this.data.c_id;
    console.log(this.expensedetail);
    const alert = await this.alertController.create({
      header: 'Are You Sure',
      message: 'DO You Want To Add Bottle Details.',
      buttons: [{
        text: 'Okay',
        handler: async () => {
          await this.apiCall.api_insertexpensedetail(this.expensedetail);
          this.expensedetail ={description:'', amount:'', date:''};
          this.Get_expenseamount()
          this.setExpensedetailclose(isOpen);
    },
    }]
    });
    await alert.present();
   
  }

 async setseeExpensedetailOpen(isOpen: boolean, data: any) {
    this.expensename = data.name;
  await this.apiCall.api_getexpensesdetail(data.ex_id);
  this.global.Expensedetail.subscribe(detail=>{
      console.log(detail);
      this.allexpensedetail = detail[0];
      this.totalexpense = detail[1];
  });
    this.isOpenseeExpensedetailModal = isOpen;
  }

  setseeExpensedetailclose(isOpen: boolean) {
    this.isOpenseeExpensedetailModal = isOpen;
  }
  // team detail
  detailteam(data : any) {
    console.log(data.e_id)
     this.apiCall.api_getcustomertotalbalance(data.e_id);
    this.apiCall.api_getcustomerdetails(data.e_id);
    this.global.CustomertotalNetbalance.subscribe(balance=>{
      console.log(balance);
    })
    this.route.navigate(['team-detail']);

    // this.global.CustomertotalNetbalance.subscribe(balance=>{
    //   console.log(balance);
    // })
    
}
get_installmentbymoont(event: any) {
  const startDate = new Date(event.target.value);
  startDate.setDate(1); // Set the day to 1 to get the start of the month

  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1); // Subtract 1 day to get the end of the month

  const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
  const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
  console.log(formattedStartDate);
  console.log(formattedEndDate);
  this.filterDtata.start = formattedStartDate;
  this.filterDtata.end = formattedEndDate;
  return { start: formattedStartDate, end: formattedEndDate };
}
filterdata(){
  this.filterDtata.c_id = this.data.c_id;
  console.log(this.filterDtata)
  this.apiCall.api_get_transactbydateandcid(this.filterDtata)
}
expenseamountfilter(){
  this.filterDtata.c_id = this.data.c_id;
  console.log(this.filterDtata)
  this.apiCall.api_get_expenseamountbycidanddate(this.filterDtata)
}

home(){
 this.route.navigate(['home']);
}
}
