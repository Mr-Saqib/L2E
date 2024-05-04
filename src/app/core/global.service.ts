import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  


  constructor() { }

    // userlogin
    private userlogin = new BehaviorSubject<any>('');
    public Userlogin = this.userlogin.asObservable();
    set_user(userlogin : any){
      this.userlogin.next(userlogin);
      console.log(this.userlogin);
    }

          // get_Installments
          private studentInstall = new BehaviorSubject<any>('');
          public StudentInstall = this.studentInstall.asObservable();
          studentInstallMENT(studentInstall: any)
          {
            this.studentInstall.next(studentInstall);
            console.log(studentInstall);
            }


      
      //  GET GetInstallments by student status and by month
    private monthlyinstallment = new BehaviorSubject<any>('');
    public Monthlyinstallment = this.monthlyinstallment.asObservable();
  installmentbyMonth(monthlyinstallment: any)
    {
      this.monthlyinstallment.next(monthlyinstallment);
      console.log(monthlyinstallment);
      }
      
      // get Installments by id
    private idinstallment = new BehaviorSubject<any>('');
    public Idinstallment = this.idinstallment.asObservable();
    get_installment_byId(idinstallment: any)
    {
      this.idinstallment.next(idinstallment);
      console.log(idinstallment);
      }      

            // get Installments by student id
    private studentIdinstallment = new BehaviorSubject<any>('');
    public StudentIdinstallment = this.studentIdinstallment.asObservable();
  get_installment_byId_StudentID(studentIdinstallment: any)
    {
      this.studentIdinstallment.next(studentIdinstallment);
      console.log(studentIdinstallment);
      }
    
          // GET STUDENT BY status
  private statusStudent = new BehaviorSubject<any>('');
  public StatusStudent = this.statusStudent.asObservable();
  get_studentbystatus(statusStudent: any)
  {
    this.statusStudent.next(statusStudent);
     console.log(statusStudent);
    }

      // GetStudents
  private getStudent = new BehaviorSubject<any>('');
  public GetStudent = this.getStudent.asObservable();
  set_Students(getStudent: any)
  {
    this.getStudent.next(getStudent);
     console.log(getStudent);
    }

    
    // active students
    private active = new BehaviorSubject<any>('');
    public Active = this.active.asObservable();
  
    active_length(active : any){
      this.active.next(active);
      console.log(this.active)
    }
    // DEACTIVE STUDENTS
    private deactive = new BehaviorSubject<any>('');
    public Deactive = this.deactive.asObservable();
  
    deactive_length(deactive : any){
      this.deactive.next(deactive);
      console.log(this.deactive)
    }
     // leave STUDENTS
     private leave = new BehaviorSubject<any>('');
     public Leave = this.leave.asObservable();
   
     leave_length(leave : any){
       this.leave.next(leave);
       console.log(this.leave)
     }

     // pendng fee STUDENTS
     private pending_fee = new BehaviorSubject<any>('');
     public Pending_fee = this.pending_fee.asObservable();
   
     pending_fee_st(pending_fee : any){
       this.pending_fee.next(pending_fee);
       console.log(this.pending_fee)
     }

     // complete fee STUDENTS
     private complete_fee = new BehaviorSubject<any>('');
     public Complete_fee = this.complete_fee.asObservable();
   
     complete_fee_st(complete_fee : any){
       this.complete_fee.next(complete_fee);
       console.log(this.complete_fee)
     }

     ///
     private getmembers = new BehaviorSubject<any>('');
     public Getmembers = this.getmembers.asObservable();
     set_members(getmembers: any)
     {
       this.getmembers.next(getmembers);
        console.log(getmembers);
       }
       private expenses = new BehaviorSubject('');
       public Expenses = this.expenses.asObservable();
       get_expenses(expenses:any) {
         this.expenses.next(expenses);
         console.log(expenses);
       }
       private expensedetail = new BehaviorSubject('');
      public Expensedetail = this.expensedetail.asObservable();
      get_expensedetail(expensedetail:any) {
        this.expensedetail.next(expensedetail);
        console.log(expensedetail);
      }
      private customertotalNetbalance = new BehaviorSubject<any>('');
      public CustomertotalNetbalance = this.customertotalNetbalance.asObservable();
    
      set_customertotalNetbalance(customertotalNetbalance: any) {
        this.customertotalNetbalance.next(customertotalNetbalance);
      }
      private customerdetails = new BehaviorSubject<any>('');
    public Customerdetails = this.customerdetails.asObservable();
  
    set_Customerdetails(customerdetails: any) {
      this.customerdetails.next(customerdetails);
    } 
      private transaction = new BehaviorSubject<any>('');
    public Transaction = this.transaction.asObservable();
  
    set_gettransaction(transaction: any) {
      this.transaction.next(transaction);
    } 
      private transactiondetail = new BehaviorSubject<any>('');
    public Transactiondetail = this.transactiondetail.asObservable();
  
    set_getteamtrdetail(transactiondetail: any) {
      this.transactiondetail.next(transactiondetail);
    } 
      private totalExpenseAmount = new BehaviorSubject<any>('');
    public TotalExpenseAmount = this.totalExpenseAmount.asObservable();
  
    set_getExpenseAmount(totalExpenseAmount: any) {
      this.totalExpenseAmount.next(totalExpenseAmount);
    } 
}
