import { Injectable, ViewChild } from '@angular/core';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastService } from './toasts/toast.service';
import { AlertService } from './alerts/alert.service';
import { IonSplitPane, MenuController } from '@ionic/angular';
import { apiUrl } from './auth.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  data: any;
  constructor(
    public global: GlobalService,
    public authservice: AuthService,
    public router: Router,
    public toast: ToastService,
    public alert: AlertService,
    private menu: MenuController,
    private http: HttpClient
  ) {}

  // userlogin function
  async user_Login(data: any): Promise<any> {
    await this.authservice.con(data, 'userlogin').then(
      (result) => {
        let data = JSON.parse(String(result));
        this.global.set_user(data);
        console.log(data);
        if (data.error === false) {
          localStorage.setItem('l2e-login', JSON.stringify(data.user));
          this.router.navigate(['/home']);
          this.menu.enable(true);
          this.toast.LoginSuccessfull();
          console.log(data);
          return true;
        } else {
          console.log(data);
          this.alert.Password_alert();
          return false;
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
  //  STUDENTS admission
  async AddStudents(data: any) {
    await this.authservice.con(data, 'insertStudents').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          this.toast.StudentAdd();
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
        //  this.alert.connection();
      }
    );
  }

  //  GET STUDENTS
  async GetStudents(c_id: any) {
    console.log(c_id + 'c_id');
    await this.authservice.getdata('getStudents/' + c_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        console.log(
          this.data.filter(
            (x: { st_status: string }) => x.st_status === 'active'
          ).length
        );
        console.log(
          this.data.filter(
            (x: { st_status: string }) => x.st_status === 'deactive'
          ).length
        );
        console.log(
          this.data.filter(
            (x: { st_status: string }) => x.st_status === 'leave'
          ).length
        );
        this.global.set_Students(this.data);
        this.global.active_length(
          this.data.filter(
            (x: { st_status: string }) => x.st_status === 'active'
          ).length
        );
        this.global.deactive_length(
          this.data.filter(
            (x: { st_status: string }) => x.st_status === 'deactive'
          ).length
        );
        this.global.leave_length(
          this.data.filter(
            (x: { st_status: string }) => x.st_status === 'leave'
          ).length
        );
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }
  async getstudentfilter(data: any) {
    console.log(data);
    await this.authservice.con(data, 'getstudentfilter').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_Students(this.data);
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  //  GET all Installments
  async GetInstallments(c_id: any) {
    console.log(c_id + ' All Installment');
    await this.authservice.getdata('getInstallments/' + c_id).then(
      (result) => {
        this.data = JSON.parse(String(result));

        this.global.studentInstallMENT(this.data);
        this.global.pending_fee_st(
          this.data.filter(
            (x: { f_status: string }) => x.f_status === 'pending'
          ).length
        );
        this.global.complete_fee_st(
          this.data.filter((x: { f_status: string }) => x.f_status === 'paid')
            .length
        );
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }
  async GetInstallmentsbyidandst(data: any) {
    // console.log(data + " GetInstallmentsbymonth")
    await this.authservice.con(data, 'getInstallmentsbyidandstatus').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.studentInstallMENT(this.data);
        console.log(this.data, 'data Updated');
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  //  GET GetInstallments by student status and by month getstudentbycourse/'+data
  async GetInstallmentsbymonth(data: any) {
    // console.log(data + " GetInstallmentsbymonth")
    await this.authservice.con(data, 'get_Installmentsbymonth').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.studentInstallMENT(this.data);
        console.log(this.data, 'data Updated');
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  //  GET GetInstallments by student status and by status getstudentbycourse/'+data
  async GetInstallmentsbystatus(data: any) {
    // console.log(data + " GetInstallmentsbymonth")
    await this.authservice.con(data, 'get_Installmentsbystatus').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.installmentbyMonth(this.data);
        console.log(this.data, 'data Updated');
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  // get_InstallmentsbyStudentId BY ID
  async get_InstallmentsbyStudentId(data: any) {
    // console.log(data + ' GET INSTALLMENTS BY STUDETN ID');
    await this.authservice.con(data, 'get_InstallmentsbyStudentId').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.get_installment_byId_StudentID(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  // GET STUDENT BY status only active student show
  async Get_StudentbyStatus(c_id: any) {
    console.log(c_id + 'status');
    await this.authservice.getdata('get_Student/' + c_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.get_studentbystatus(this.data);
        console.log(this.data, 'data Updated');
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  // GET Installments BY ID
  async Get_InstallmentbyId(data: any) {
    // console.log(data + 'i_id');
    await this.authservice.con(data, 'get_Installments').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.get_installment_byId(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  // UPDATE STUDENTS
  async UpdateStudents(data: any) {
    await this.authservice.con(data, 'updateStudents').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  // UPDATE Installments
  async UpdateInstallments(data: any) {
    console.log(data);
    await this.authservice.con(data, 'updateInstallments').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  // UPDATE Account
  async Update_Account(data: any) {
    await this.authservice.con(data, 'updateAccount').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  //  DELETE Installments
  async Delete_Installments(data: any) {
    await this.authservice.con(data, 'deleteInstallments').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  // POST Add_Installments
  async Add_Installments(data: any) {
    console.log(data);
    await this.authservice.con(data, 'insertInstallments').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          this.toast.StudentAdd();
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  //////
  ///get team member
  async Get_allteam(c_id: any) {
    console.log(c_id + 'status');
    await this.authservice.getdata('getteamember/' + c_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_members(this.data);
        console.log(this.data, 'data Updated');
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }
  // team insert
  async insert_tmember(data: any) {
    await this.authservice.con(data, 'insertmember').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          this.toast.AccountAdded();
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
        // this.alert.connection();
      }
    );
  }
  async insert_teamexpence(data: any) {
    await this.authservice.con(data, 'updatecustomerbalance').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          this.toast.AccountAdded();
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
        // this.alert.connection();
      }
    );
  }
  async api_getexpenses(c_id: any) {
    await this.authservice.getdata('getexpenses/' + c_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.get_expenses(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // POST expense
  async api_insertexpense(data: any) {
    await this.authservice.con(data, 'insertexpense').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }

  async api_insertexpensedetail(data: any) {
    await this.authservice.con(data, 'insertexpensedetail').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }
  async api_getexpensesdetail(ex_id: any) {
    await this.authservice.getdata('getexpensesdetail/' + ex_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.get_expensedetail(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async api_getcustomertotalbalance(customer_id: any) {
    await this.authservice
      .getdata('getcustomertotalNetbalance/' + customer_id)
      .then(
        (result) => {
          this.data = JSON.parse(String(result));
          console.log(this.data);
          this.global.set_customertotalNetbalance(this.data);
          // this.router.navigate(['customerdetail']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  api_getcustomerdetails(e_id: any) {
    this.authservice.getdata('getcustomerdetailbuid/' + e_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_Customerdetails(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  api_getacctransaction(c_id: any) {
    this.authservice.getdata('gettransactions/' + c_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_gettransaction(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async api_gettransactionsbyfilter(data: any) {
    await this.authservice.con(data, 'gettransactionsbyfilter').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_gettransaction(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }
  async api_transactionbycid(c_id: any) {
    await this.authservice.getdata('get_transactbyc_id/' + c_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_getteamtrdetail(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async api_get_expamountonc_id(c_id: any) {
    await this.authservice.getdata('get_expamountonc_id/' + c_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_getExpenseAmount(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async api_get_transactbydateandcid(data: any) {
    await this.authservice.con(data, 'get_transactbydateandcid').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_getteamtrdetail(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }
  async api_get_expenseamountbycidanddate(data: any) {
    await this.authservice.con(data, 'get_expenseamountbycidanddate').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_getExpenseAmount(this.data);
        console.log(this.data);
        return result;
      },
      (err) => {
        console.log(err);
        this.alert.connection();
      }
    );
  }
  public studentinstallmentbymonth(userobj: any): Observable<any> {
    return this.http.post(apiUrl + `monthlyinstallment`, userobj).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
