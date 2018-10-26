import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpService } from '../employee/services/emp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router,private empSvc:EmpService) { }

  ngOnInit() {
  }

  login(){

    localStorage.setItem('token','abc123');
    this.route.navigate(["admin"]);
  
  }

  empCsvFile:File;
  CsvFile(file){
    this.empCsvFile=file.target.files[0];
    console.log(this.empCsvFile);
  }
  CSVUpload(){
    const csvFile = new FormData();
    csvFile.append('file',this.empCsvFile,this.empCsvFile.name);

    this.empSvc.UploadCSV(csvFile).subscribe(
      (success)=>{
        console.log(success);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
