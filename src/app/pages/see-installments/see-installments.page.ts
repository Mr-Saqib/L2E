import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/core/alerts/alert.service';
import { ApiService } from 'src/app/core/api.service';
import { GlobalService } from 'src/app/core/global.service';
import { ToastService } from 'src/app/core/toasts/toast.service';

import { format, parseISO } from 'date-fns';
import { MatTableDataSource } from '@angular/material/table';
import { ModalPage } from '../modal/modal.page';
import { DatePipe, formatDate } from '@angular/common';
import { check } from 'src/app/localStorage/LocalStorage';

@Component({
  selector: 'app-see-installments',
  templateUrl: './see-installments.page.html',
  styleUrls: ['./see-installments.page.scss'],
})
export class SeeInstallmentsPage implements OnInit {
  selectedStatus: any;
  filterTerm!: string;

  refresher = false;
  public total: any = 0;
  dataSource!: MatTableDataSource<any>;

  public student_Installments: any[] = [];
  public installmentsBackup: any[] = [];

  public Category: any = 'installmentupdate';
  public Category2: any = 'feedetails';
  public installment_by_id: any;
  public by_Month: any = { a_month: '' };
  data: any;
  public installmentbymonth: any = {
    c_id: null,
    f_status: null,
    start: null,
    end: null,
  };
  select_student_Data: any;
  selectFilter: any;
  pending_FeeSt: any = 0;
  complete_FeeSt: any = 0;
  public student_Installments_length2: any;
  student_Installments_length3: any;
  campus_students: any;
  public userobj: any = {};
  public user: any;
  constructor(
    public route: Router,
    public toast: ToastService,
    private datePipe: DatePipe,
    public modalController: ModalController,
    public alert: AlertService,
    public global: GlobalService,
    public ApiCall: ApiService
  ) {}
  public filterdate: any = '';
  ngOnInit() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1

    // Create a formatted date string like "yyyy-MM"
    const formattedDate = `${currentYear}-${currentMonth
      .toString()
      .padStart(2, '0')}`;

    // Output: e.g., "2023-10"

    this.Get_Installments('2023-10-27');
  }

  async Get_Installments(date: any) {
    this.user = await check('user');
    this.userobj = JSON.parse(this.user);
    this.installmentbymonth.c_id = this.userobj.c_id;
    await this.ApiCall.GetInstallments(this.userobj.c_id);
    await this.global.StudentInstall.subscribe((res: any[]) => {
      // this.student_Installments;
      this.student_Installments = res?.filter(
        (installments) => (installments.payable_date = date)
      );
      // this.student_Installments = res.filter(installments => installments.payable_date >= date.start && installments.payable_date <= date.end);
      this.installmentsBackup = res;
      this.total = res;
      console.log(this.total);
      this.complete_FeeSt = this.total.filter(
        (x: { f_status: string }) => x.f_status === 'paid'
      ).length;
      this.pending_FeeSt = this.total.filter(
        (x: { f_status: string }) => x.f_status === 'pending'
      ).length;
    });
  }
  searchItems(value: any) {
    this.dataSource = new MatTableDataSource<any>(this.installmentsBackup);
    this.dataSource.filter = value.trim().toLowerCase();
    this.student_Installments = this.dataSource.filteredData;
  }

  async select_status($event: any) {
    console.log($event.target.value);
    this.installmentbymonth.f_status = $event.target.value;
  }
  async select_campus($event: any) {
    console.log($event.target.value);
    this.selectFilter = $event.target.value;
    this.student_Installments = this.installmentsBackup;
    if (this.selectFilter != 'all') {
      this.student_Installments = this.student_Installments.filter(
        (val) => val.c_id == this.selectFilter
      );
      this.student_Installments_length2 = this.student_Installments.length;
      console.log(this.student_Installments_length2);
      console.log(this.student_Installments);
    }
  }

  // Get_Installments function

  get_installmentbymoont($event: any) {
    const startDate = $event.target.value;
    console.log(startDate);
    this.filterdate = startDate;
    startDate.setDate(1);

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
    console.log(formattedStartDate);
    console.log(formattedEndDate);

    this.installmentbymonth.start = formattedStartDate;
    this.installmentbymonth.end = formattedEndDate;
    return { start: formattedStartDate, end: formattedEndDate };
  }

  filterdata() {
    const obj = {
      c_id: this.userobj.c_id,
      date: this.filterdate,
      status: this.installmentbymonth.f_status,
    };
    // console.log(obj);
    this.ApiCall.studentinstallmentbymonth(obj).subscribe((res) => {
      this.student_Installments = res;
      this.installmentsBackup = res;

      this.complete_FeeSt = this.total.filter(
        (x: { f_status: string }) => x.f_status === 'paid'
      ).length;
      this.pending_FeeSt = this.total.filter(
        (x: { f_status: string }) => x.f_status === 'pending'
      ).length;
    });
  }

  async view_all_installment(data: any) {
    const x = { id: data, c_id: data.c_id };
    await this.ApiCall.get_InstallmentsbyStudentId(x);
    this.global.StudentIdinstallment.subscribe((res) => {
      console.log(res);
      this.installment_by_id = res;
    });

    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-modal-class',
      initialBreakpoint: 0.93,
      breakpoints: [0, 0.435, 0.93],
      componentProps: {
        Installment_details: this.installment_by_id,
        Category2: this.Category2,
      },
    });
    console.log('modal');
    return await modal.present();
  }

  refresh() {
    this.refresher = true;
    setTimeout(() => {
      (this.refresher = false), this.ApiCall.GetInstallments(this.data.c_id);
      this.Get_Installments('2023-10-27');
    }, 1500);
    this.installmentbymonth = {
      c_id: null,
      f_status: null,
      start: null,
      end: null,
    };
  }

  home() {
    this.route.navigate(['home']);
  }
}
