import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) { }
  createEmployee(employee:Employee){
       return this.http.post<any>(`${environment.apiUrl}/employee`,employee);
  }
  updateEmployee(employee:Employee,id:number){
    return this.http.put<any>(`${environment.apiUrl}/employee/${id}`,employee);
}
getEmployee(id:number){
  return this.http.get<any>(`${environment.apiUrl}/employee/${id}`);
}
getAllEmployees(){
  return this.http.get<any>(`${environment.apiUrl}/employee/get-all`);
}
deleteEmployee(id:number){
  return this.http.delete<any>(`${environment.apiUrl}/employee?id=${id}`);
}
}
