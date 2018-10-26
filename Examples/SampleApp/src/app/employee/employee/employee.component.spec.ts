import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';
import { EmpInfoComponent } from '../emp-info/emp-info.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { FilterPipe } from '../pipes/filter.pipe';
import { SalaryIncreasePipe } from '../pipes/salary-increase.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { EmpService } from '../services/emp.service';
import { HttpClientModule } from '@angular/common/http';



describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        EmpInfoComponent,
        FilterPipe,
        SalaryIncreasePipe
      ],
      providers:[EmpService],
      imports: [
        FormsModule, 
        DataTableModule,
        RouterTestingModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
