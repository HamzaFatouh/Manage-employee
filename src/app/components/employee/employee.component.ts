import { Component,OnInit} from '@angular/core';

import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  listOfEmployee:Employee[] = [];
  employee: Employee = new Employee();
  show:boolean=false;
  mode!: string;





  constructor(private httpService:EmployeeService,){}


  ngOnInit(): void {
    this.httpService.getAllEmployee().subscribe(result =>this.listOfEmployee=result);


  }

  saveEmployee(){
    if(this.mode == 'add'){
      this.httpService.addEmployee(this.employee).subscribe(employee => {
        this.listOfEmployee.push(employee);
      })
    }else{
      this.httpService.updateEmployee(this.employee).subscribe(employee => {
        for(let e of this.listOfEmployee){
          if(e.id == employee.id){
           // e = employee;
           Object.assign(e, employee);
          }
        }
        this.show = false;
      })
    }

  }


  delete(id:number){
    this.httpService.deleteEmployee(id).subscribe(state => {
      if(state){
        this.listOfEmployee = this.listOfEmployee.filter(e => e.id != id);
      }
    });

  }

  selectedEmployee(id: number){
    //this.employee
   // this.employee = this.listOfEmployee.find(e => e.id == id);
    Object.assign(this.employee, this.listOfEmployee.find(e => e.id == id));
    this.show = true;
    this.mode = 'update';
    console.log(this.employee)
  }

  showAdd(){
    this.mode = 'add';
    this.show = !this.show;
}

}
