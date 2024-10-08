import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'departments',
        loadChildren: () =>
          import('./departments/departments.module').then(
            (m) => m.DepartmentsModule
          ),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
      },

      {
        path: 'salary-details',
        loadChildren: () =>
          import('./salary-details/salary-details.module').then(
            (m) => m.SalaryDetailsModule
          ),
      },
      { path: 'add-employee-form', loadChildren: () => import('./forms/employee-form/employee-form.module').then(m => m.EmployeeFormModule) },
      { path: 'edit-employee-form/:id', loadChildren: () => import('./forms/employee-form/employee-form.module').then(m => m.EmployeeFormModule) },
      { path: 'add-department-form', loadChildren: () => import('./forms/department-form/department-form.module').then(m => m.DepartmentFormModule) },
      { path: 'edit-department-form/:id', loadChildren: () => import('./forms/department-form/department-form.module').then(m => m.DepartmentFormModule) },
      { path: 'add-salary-details-form', loadChildren: () => import('./forms/salary-details-form/salary-details-form.module').then(m => m.SalaryDetailsFormModule) },
      { path: 'edit-salary-details-form/:id', loadChildren: () => import('./forms/salary-details-form/salary-details-form.module').then(m => m.SalaryDetailsFormModule) },
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'employees' },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
