import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryDetailsFormComponent } from './salary-details-form.component';

describe('SalaryDetailsFormComponent', () => {
  let component: SalaryDetailsFormComponent;
  let fixture: ComponentFixture<SalaryDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryDetailsFormComponent]
    });
    fixture = TestBed.createComponent(SalaryDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
