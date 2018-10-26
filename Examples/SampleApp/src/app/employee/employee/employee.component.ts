import { Component, OnInit } from '@angular/core';
import { EmpService } from '../services/emp.service';
import { ActivatedRoute, Router } from '@angular/router';
//MetaData
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(
    private empSvc: EmpService,
    private activeRoute: ActivatedRoute,
    private route:Router
  ) { }

  empData: any;
  message = "Hello!";

  id: number;
  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      this.id = param["id"];
      if (this.id!=undefined) {
        this.DeleteEmployeeData(this.id);
      }
    });
    this.GetEmployeeData();
  }

  GetEmployeeData() {
    //Promise
    // this.empSvc.GetEmployee().then(
    //   (result)=>{
    //       this.empData = result;
    //       console.log(result);
    //   },
    //   (error)=>{
    //       console.log(error);
    //   }
    // );
    //Observables
    this.empSvc.GetEmployee().subscribe(
      (result) => {
        this.empData = result;
        console.log(result);
      },
      (error) => {
        this.message = error.message;
        console.log(error.message);
      }
    );
  }

  DeleteEmployeeData(id) {
    if (confirm("Are you sure?")) {
      this.empSvc.DeleteEmployee(id).subscribe(
        (result) => {
          this.route.navigate(["/employee"]);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }



  data: string;
  DataReciever(receivedData) {
    this.data = receivedData;
  }
}
