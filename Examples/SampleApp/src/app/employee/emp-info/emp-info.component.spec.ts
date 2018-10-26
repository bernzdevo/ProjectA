import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInfoComponent } from './emp-info.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { FilterPipe } from '../pipes/filter.pipe';
import { SalaryIncreasePipe } from '../pipes/salary-increase.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmpInfoComponent', () => {
  let component: EmpInfoComponent;
  let fixture: ComponentFixture<EmpInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpInfoComponent,FilterPipe,SalaryIncreasePipe ],
      imports:[FormsModule,DataTableModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
