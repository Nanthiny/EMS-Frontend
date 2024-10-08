import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Employee, EmployeeSalary } from '../../models/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalaryDetailsService {

  constructor(private http: HttpClient) { }
  createEmployeeSalary(employee:EmployeeSalary){
       return this.http.post<any>(`${environment.apiUrl}/employeeSalary`,employee);
  }
  updateEmployeeSalary(employee:EmployeeSalary,id:number){
    return this.http.put<any>(`${environment.apiUrl}/employeeSalary/${id}`,employee);
}
getEmployeeSalary(id:number){
  return this.http.get<any>(`${environment.apiUrl}/employeeSalary/${id}`);
}
getAllEmployeeSalary(){
  return this.http.get<any>(`${environment.apiUrl}/employeeSalary/get-all`);
}
deleteEmployeeSalary(id:number){
  return this.http.delete<any>(`${environment.apiUrl}/employeeSalary?id=${id}`);
}
}
