import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EmployeesService } from './employees.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { DepartmentsComponent } from '../departments/departments.component';
import { SalaryDetailsComponent } from '../salary-details/salary-details.component';
import { FormTemplate } from 'src/app/templates/form.template';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  public loading = false;
  employees: any = [];
  empId=0;
  destroy$ = new Subject<void>();

  constructor(
    private emp: EmployeesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getAllEmployees() {
    this.spinner.show();
    this.emp
      .getAllEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.employees = data;
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
      .deleteEmployee(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.getAllEmployees()
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
