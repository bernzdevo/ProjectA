import { TestBed } from '@angular/core/testing';

import { EmpService } from './emp.service';
import { HttpClientModule } from '@angular/common/http';

describe('EmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[EmpService],
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: EmpService = TestBed.get(EmpService);
    expect(service).toBeTruthy();
  });
});
