import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterValidationConditionalValidatorsExample } from './better-validation-conditional-validators-example.component';

describe('BetterValidation', () => {
  let component: BetterValidationConditionalValidatorsExample;
  let fixture: ComponentFixture<BetterValidationConditionalValidatorsExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetterValidationConditionalValidatorsExample],
    }).compileComponents();

    fixture = TestBed.createComponent(BetterValidationConditionalValidatorsExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
