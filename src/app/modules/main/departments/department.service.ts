import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department, Employee } from '../../models/interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  createDepartment(department:Department){
       return this.http.post<any>(`${environment.apiUrl}/department`,department);
  }
  updateDepartment(department:Department,id:number){
    return this.http.put<any>(`${environment.apiUrl}/department/${id}`,department);
}
getDepartment(id:number){
  return this.http.get<any>(`${environment.apiUrl}/department/${id}`);
}
getAllDepartment(){
  return this.http.get<any>(`${environment.apiUrl}/department/get-all`);
}
deleteDepartment(id:number){
  return this.http.delete<any>(`${environment.apiUrl}/department?id=${id}`);
}
}
