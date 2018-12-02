import { TestBed, inject } from '@angular/core/testing';

import { PayrollService } from './payroll.service';

describe('PayrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayrollService]
    });
  });

  it('should be created', inject([PayrollService], (service: PayrollService) => {
    expect(service).toBeTruthy();
  }));
});
