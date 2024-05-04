import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { GlobalService } from 'src/app/core/global.service';

@Component({
  selector: 'app-see-account',
  templateUrl: './see-account.page.html',
  styleUrls: ['./see-account.page.scss'],
})
export class SeeAccountPage implements OnInit {
  data: any;
  public transactionDetail: any = [];
  netbalance: any;
  debit: any;
  credit: any;
  refresher=false;
 
  public filterDtata: any = { c_id: '', type:null, start:null, end:null}

  constructor( public apicall: ApiService , public global: GlobalService, private datePipe: DatePipe,public route : Router) { }

  async ngOnInit() {
    await this.global.Userlogin.subscribe(res =>{
      this.data = res.user;
      console.log(this.data)
    })
    this.getaccounttransaction();
      

  }
  home(){
     this.route.navigate(['home']);
  }
  getaccounttransaction(){
     this.apicall.api_getacctransaction(this.data.c_id);
     this.global.Transaction.subscribe( res=>{
      this.transactionDetail = res[0];
      this.netbalance = res[3][0].netbalance;
      this.debit = res[1][0].total_debit;
      this.credit = res[2][0].total_credit;
      console.log(res)
     })
  }
  selecttype(event : any){
    this.filterDtata.type = event.target.value;
    console.log(this.filterDtata.type)
 
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
    this.apicall.api_gettransactionsbyfilter(this.filterDtata);
    this.global.Transaction.subscribe( res=>{
      console.log(res)
     })
     
  }
   
  async refresh(){
    this.refresher=true
    setTimeout(() => {
      this.refresher=false,
      
      this.getaccounttransaction()
      this.filterDtata = { c_id: '', type:null, start:null, end:null}
    }, 1500 ); 
  }

}
