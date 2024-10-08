import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTemplate, State } from 'src/app/templates/form.template';
import { DepartmentService } from '../../departments/department.service';
import { Subject, takeUntil } from 'rxjs';
import { Department } from 'src/app/modules/models/interface';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent
  extends FormTemplate
  implements OnInit, OnDestroy
{
  title = '';
  state: State;
  id;
  destroy$ = new Subject<void>();

  constructor(
    fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dept: DepartmentService,
    toastr: ToastrService,
    spinner: NgxSpinnerService
  ) {
    super(fb, toastr, spinner);
    const param = this.actRoute.snapshot.paramMap.get('id');
    if (param) {
      this.title = 'Edit Department Info';
      this.state = State.EDIT;
      this.id = Number(param);
      this.getDepartmentById(this.id);
    } else {
      this.state = State.CREATE;
      this.title = 'Add Department Info';
    }
  }
  setForm() {
    this.form = this.fb.group({
      departmentName: [, [Validators.required, Validators.maxLength(40)]],
    });
  }
  ngOnInit(): void {
    this.setForm();
  }

  submitForm() {
    if (this.valid) {
      this.createOrUpdateDepartment();
    }
  }
  cancel() {
    this.router.navigateByUrl('/departments');
  }
  createOrUpdateDepartment() {
    var data: Department = {
      departmentName: this.form.value.departmentName,
    };
    if (this.state == State.EDIT) {
      this.dept
        .updateDepartment(data, this.id)
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
            this.router.navigateByUrl('/departments');
          },
        });
    } else {
      this.dept
        .createDepartment(data)
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
            this.router.navigateByUrl('/departments');
          },
        });
    }
  }
  getDepartmentById(id) {
    this.showSpinner();
    this.dept
      .getDepartment(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          if (data !== undefined) {
            this.form.patchValue({
              departmentName: data.departmentName,
            });
            this.hideSpinner();
          }
        },
        error: (e) => {
          this.showError(e.message);
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
