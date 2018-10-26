import { Component, OnInit } from '@angular/core';
import { EmpService } from 'src/app/employee/services/emp.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/employee/interfaces/EmployeeModel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private empSvc: EmpService,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit() {
  }

  //Reactive Forms Declarations
  empReactForm = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.maxLength(10)]],
    lastname: ['', [Validators.required]],
    salary: ['', [Validators.required]],
    hiredate: ['', [Validators.required]],
    picture: ['']
  });

  //For Upload
  employeeImage: File;
  FileUpload(event) {
    this.employeeImage = event.target.files[0];
    console.log(event.target.files[0]);
  }

  // FileUploadClick() {
  //   let imageData = new FormData();

  //   imageData.append('file', this.employeeImage, this.employeeImage.name);
  //   imageData.append('empData', JSON.stringify(this.empReactForm.value));


  //   this.empSvc.UploadImage(imageData).subscribe(
  //     (success) => {
  //       console.log(success);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  //Reactive Form Submit Function
  SubmitReactiveForm() {
    let imageData = new FormData();

    imageData.append('file', this.employeeImage, this.employeeImage.name);
    imageData.append('empData', JSON.stringify(this.empReactForm.value));


    this.empSvc.UploadImage(imageData).subscribe(
      (success) => {
        console.log(success);
        this.router.navigate(["employee"]);
      },
      (error) => {
        console.log(error);
      }
    );

    // console.log(this.empReactForm.value);
    // this.empSvc.CreateEmployee(this.empReactForm.value).subscribe(
    //   (success) => {
    //     console.log(success);
    //     this.router.navigate(['/employee']);
    //     //this.GetEmployeeData();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  emp = new EmployeeModel(); //<----will hold the form data/values
  SendEmployeeData(employee) {
    this.empSvc.CreateEmployee(employee).subscribe(
      (success) => {
        console.log(success);
        //this.GetEmployeeData();
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(employee);
  }
}
