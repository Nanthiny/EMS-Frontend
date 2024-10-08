import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SalaryDetailsService } from './salary-details.service';
import { Subject, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-salary-details',
  templateUrl: './salary-details.component.html',
  styleUrls: ['./salary-details.component.scss'],
})
export class SalaryDetailsComponent implements OnInit {
  details: any = [];
  destroy$ = new Subject<void>();
  empId=0;
  constructor(
    private emp: SalaryDetailsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.getAllEmployeesSalary();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getAllEmployeesSalary() {
    this.spinner.show();
    this.emp
      .getAllEmployeeSalary()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.details = data;
            this.hideSpinner();
          }
        },
        error: (e) => {
          this.toastr.error(e.message, 'Error');
          this.hideSpinner();
        },
      });
  }
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  onConfirm() {
    this.delete(this.empId)
  }
  deleteData(id:number){
    this.empId=id;
    this.openModal()
  }
  delete(id: number) {
    this.spinner.show();
    this.emp
      .deleteEmployeeSalary(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.getAllEmployeesSalary()
            this.hideSpinner();
          }
        },
        error: (e) => {
          this.toastr.error(e.message, 'Error');
          this.hideSpinner();
        },
      });
  }
  hideSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
