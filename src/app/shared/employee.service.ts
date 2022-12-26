import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  dns:string="http://localhost:8080/employee/";


  constructor( private http :HttpClient) { }

  public getAllEmployee():Observable<Employee[]>{
    // console.log(this.getAllEmployee());
    return this.http.get<Employee[]>(this.dns+ "findall");
  }

  public addEmployee(employe: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.dns + "add",employe );
  }


  public updateEmployee(employe: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.dns + "update", employe);
  }

  public deleteEmployee(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(this.dns + "delete/" + id);
  }
}
