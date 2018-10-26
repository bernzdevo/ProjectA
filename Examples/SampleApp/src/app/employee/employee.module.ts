import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { EmpInfoComponent } from './emp-info/emp-info.component';
import { EmpService } from './services/emp.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalaryIncreasePipe } from './pipes/salary-increase.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { DataTableModule } from 'angular-6-datatable';
import { SampleDirective } from './directives/sample.directive';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './employee/operations/create/create.component';
import { UpdateComponent } from './employee/operations/update/update.component';

const employeeRoutes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/create', component: CreateComponent },
  { path: 'employee/update/:id', component: UpdateComponent },
  { path: 'employee/delete/:id', component: EmployeeComponent }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(employeeRoutes)
  ],
  exports: [EmployeeComponent],
  declarations: [
    EmployeeComponent,
    EmpInfoComponent,
    SalaryIncreasePipe,
    FilterPipe,
    SampleDirective,
    CreateComponent,
    UpdateComponent
  ],
  providers: [EmpService]
})
export class EmployeeModule { }
