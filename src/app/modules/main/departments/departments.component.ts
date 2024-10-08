import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from './department.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  departments: any = [];
  deptId=0;
  destroy$ = new Subject<void>();
  constructor(
    private depart: DepartmentService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAlldepartments();
  }
  getAlldepartments() {
    this.spinner.show();
    this.depart
      .getAllDepartment()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.departments = data;
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
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  onConfirm() {
    this.delete(this.deptId)
  }
  deleteData(id:number){
    this.deptId=id;
    this.openModal()
  }
  delete(id: number) {
    this.spinner.show();
    this.depart
      .deleteDepartment(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.getAlldepartments()
            this.hideSpinner();
          }
        },
        error: (e) => {
          this.toastr.error(e.message, 'Error');
          this.hideSpinner();
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
