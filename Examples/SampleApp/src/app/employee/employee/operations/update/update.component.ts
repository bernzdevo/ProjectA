import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpService } from 'src/app/employee/services/emp.service';
import { IEmployee } from 'src/app/employee/interfaces/IEmployee';
import { EmployeeModel } from 'src/app/employee/interfaces/EmployeeModel';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private activeRoute:ActivatedRoute,
    private empSvc: EmpService,
    private route:Router
    ) { }

  id:number;
  ngOnInit() {
    this.activeRoute.params.subscribe(param=>{
      this.id = param["id"];
      this.GetEmployeeById(this.id);
    });
  }

  empID: number;
  GetEmployeeById(id: number) {
    this.empSvc.GetEmployeeById(id).subscribe(
      (result: IEmployee) => {
        let hiredate = new Date(result.hiredate);

        let day = hiredate.getDate().toString();
        let month = (hiredate.getMonth() + 1).toString();
        let year = hiredate.getFullYear();
        if (month.length < 2) { month = '0' + month }
        if (day.length < 2) { day = '0' + day }
        let parsedDate = year + "-" + month + "-" + day;

        result.hiredate = parsedDate;
        this.editEmp = result;
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editEmp = new EmployeeModel();
  EditEmployeeData(empToUpdate) {
    this.empSvc.UpdateEmployee(empToUpdate, this.id).subscribe(
      (result) => {
        //this.GetEmployeeData();
        this.route.navigate(['/employee']);
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(empToUpdate);
  }

}
