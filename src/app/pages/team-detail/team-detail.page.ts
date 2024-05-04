import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { GlobalService } from 'src/app/core/global.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {

  public data: any;
  public last: any;
  public total_debit: any = 0;
  public total_credit: any = 0;
  public totalnetbalance: any = 0;

  constructor( public global: GlobalService , public apiCall:ApiService ) { }

  ngOnInit() {
    this.global.Customerdetails.subscribe(res => {
      console.log(res);

      this.data = res;
      console.log( this.data)
      this.last = this.data[this.data.length - 1];
     // console.log(this.last.net_balance);
    });
    this.global.CustomertotalNetbalance.subscribe(async balance=>{
      this.total_debit = await balance[1].totaldebit;
      this.total_credit = await balance[2].totalcredit;
      this.totalnetbalance = await balance[0].totalNetbalance;
      console.log(balance);
    })
  }

}
