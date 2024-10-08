import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormTemplate, State } from 'src/app/templates/form.template';
import { DepartmentService } from '../../departments/department.service';
import { EmployeesService } from '../../employees/employees.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/modules/models/interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent extends FormTemplate implements OnInit {
  private readonly EmailValiationPattern =
    /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  departments: any = [];
  title = '';
  state: State;
  id;
  destroy$ = new Subject<void>();
  constructor(
    fb: FormBuilder,
    private dept: DepartmentService,
    private emp: EmployeesService,
    toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute,
    spinner: NgxSpinnerService
  ) {
    super(fb, toastr, spinner);
    const param = this.actRoute.snapshot.paramMap.get('id');
    if (param) {
      this.title = 'Edit Employee Info';
      this.state = State.EDIT;
      this.id = Number(param);
      this.getEmployeeById(this.id);
    } else {
      this.state = State.CREATE;
      this.title = 'Add Employee Info';
    }
  }

  ngOnInit(): void {
    this.getAlldepartments();
    this.setForm();
  }
  submitForm() {
    if (this.valid) {
      this.createOrUpdateEmployee();
    }
  }
  cancel() {
    this.router.navigateByUrl('/employees');
  }
  setForm() {
    this.form = this.fb.group({
      employeeNumber: [, [Validators.required, Validators.maxLength(10)]],
      employeeName: [, [Validators.required, Validators.maxLength(20)]],
      emailAddress: [
        ,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.EmailValiationPattern),
        ],
      ],
      phone: [
        ,
        [Validators.required, Validators.pattern(/^[0-9\(\)\-\+]{6,20}$/)],
      ],
      departmentId: ['', [Validators.required, Validators.minLength(1)]],
      jobTitle: [, [Validators.required]],
      joinedDate: [, [Validators.required]],
    });
  }
  getAlldepartments() {
    this.dept
      .getAllDepartment()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.departments = data;
          }
        },
        error: (e) => {
          this.showError(e.message);
        },
      });
  }
  createOrUpdateEmployee() {

    var data: Employee = {
      employeeNumber: this.form.value.employeeNumber,
      employeeName: this.form.value.employeeName,
      emailAddress: this.form.value.emailAddress,
      phone: this.form.value.phone,
      departmentId: Number(this.form.value.departmentId),
      jobTitle: this.form.value.jobTitle,
      joinedDate: this.form.value.joinedDate,
    };
    if (this.state == State.EDIT) {
      this.emp
        .updateEmployee(data, this.id)
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
            this.router.navigateByUrl('/employees');
          },
        });
    } else {
      this.emp
        .createEmployee(data)
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
            this.router.navigateByUrl('/employees');
          },
        });
    }
  }
  getEmployeeById(id) {
    this.showSpinner();
    this.emp
      .getEmployee(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.form.patchValue({
              employeeNumber: data.employeeNumber,
              employeeName: data.employeeName,
              emailAddress: data.emailAddress,
              phone: data.phone,
              departmentId: data.departmentId,
              jobTitle: data.jobTitle,
              joinedDate: this.formatDate(data.joinedDate),
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
