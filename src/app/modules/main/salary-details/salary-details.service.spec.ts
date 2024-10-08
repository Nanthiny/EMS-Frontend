import { TestBed } from '@angular/core/testing';

import { SalaryDetailsService } from './salary-details.service';

describe('SalaryDetailsService', () => {
  let service: SalaryDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
