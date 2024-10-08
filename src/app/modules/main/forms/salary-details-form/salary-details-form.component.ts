import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FormTemplate, State } from 'src/app/templates/form.template';
import { EmployeesService } from '../../employees/employees.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryDetailsService } from '../../salary-details/salary-details.service';
import { EmployeeSalary } from 'src/app/modules/models/interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-salary-details-form',
  templateUrl: './salary-details-form.component.html',
  styleUrls: ['./salary-details-form.component.scss'],
})
export class SalaryDetailsFormComponent
  extends FormTemplate
  implements OnInit, OnDestroy
{
  details: any = [];
  employees: any = [];
  title = '';
  state: State;
  id;
  destroy$ = new Subject<void>();
  constructor(
    fb: FormBuilder,
    private salaryDetails: SalaryDetailsService,
    private emp: EmployeesService,
    toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute,
    spinner: NgxSpinnerService
  ) {
    super(fb, toastr, spinner);
    const param = this.actRoute.snapshot.paramMap.get('id');
    if (param) {
      this.title = 'Edit Employee Salary Info';
      this.state = State.EDIT;
      this.id = Number(param);
      this.getEmployeeSalaryDetailsById(this.id);
    } else {
      this.state = State.CREATE;
      this.title = 'Add Employee Salary Info';
    }
  }
  ngOnInit(): void {
    this.setForm();
    this.getAllEmployees();
  }
  submitForm() {
    if (this.valid) {
      this.createOrUpdateEmployeeSalaryDetails();
    }
  }
  setForm() {
    this.form = this.fb.group({
      employeeId: ['', [Validators.required, Validators.minLength(1)]],
      salary: [, [Validators.required]],
      effectiveDate: [, [Validators.required]],
    });
  }
  cancel() {
    this.router.navigateByUrl('/salary-details');
  }
  getAllEmployees() {
    this.emp
      .getAllEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.employees = data;
          }
        },
        error: (e) => {
          this.toastr.error(e.message, 'Error');
        },
      });
  }
  getEmployeeSalaryDetailsById(id: number) {
    this.showSpinner();
    this.salaryDetails
      .getEmployeeSalary(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.form.patchValue({
              employeeId: data.employeeId,
              salary: data.salary,
              effectiveDate: this.formatDate(data.effectiveDate),
            });
            this.hideSpinner();
          }
        },
        error: (e) => {
          this.showError(e.message);
          this.hideSpinner();
        },
      });
  }
  createOrUpdateEmployeeSalaryDetails() {
    var data: EmployeeSalary = {
      employeeId: Number(this.form.value.employeeId),
      salary: this.form.value.salary,
      effectiveDate: this.form.value.effectiveDate,
    };
    if (this.state == State.EDIT) {
      this.salaryDetails
        .updateEmployeeSalary(data, this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            if (data !== undefined) {
              if(data.isSuccess){
                this.showSuccess(data.message);
              }else{
                this.showError(data.message);
              }
            }
          },
          error: (e) => {
            this.showError(e.message);
          },
          complete: () => {
            this.router.navigateByUrl('/salary-details');
          },
        });
    } else {
      this.salaryDetails
        .createEmployeeSalary(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            if (data !== undefined) {
              if(data.isSuccess){
                this.showSuccess(data.message);
              }else{
                this.showError(data.message);
              }
            }
          },
          error: (e) => {
            this.showError(e.message);
          },
          complete: () => {
            this.router.navigateByUrl('/salary-details');
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
