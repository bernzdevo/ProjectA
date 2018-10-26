import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class EmpService {
 
  constructor(private http: HttpClient) { }

  UploadImage=(imageFile)=>{
    return this.http.post("http://localhost:57527/employee/image",imageFile);
  
    //return this.http.post("http://localhost/serversideapi/employee/image",imageFile);
  }

  UploadCSV=(csvFile)=>{
    return this.http.post("http://localhost:57527/employee/csvprocess",csvFile);
  }


  GetEmployee = () => {
    //Promise
    //return this.http.get('http://localhost/serversideapi/api/employees').toPromise();

    //Observables
    return this.http.get('http://localhost/serversideapi/api/employees');

  }
  CreateEmployee = (EmployeeData) => {


    return this.http.post('http://localhost/serversideapi/api/employees',EmployeeData);
  
  
  }

  GetEmployeeById=(id)=>{
    return this.http.get('http://localhost/serversideapi/api/employees/'+id);
  }

  UpdateEmployee=(EmployeeData,id)=>{
    return this.http.put('http://localhost/serversideapi/api/employees/'+id,EmployeeData);
  }

  DeleteEmployee=(id)=>{
    return this.http.delete('http://localhost/serversideapi/api/employees/'+id);
  }

}
