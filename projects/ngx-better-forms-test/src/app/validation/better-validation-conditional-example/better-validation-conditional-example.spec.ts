import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterValidationConditionalExample } from './better-validation-conditional-example';

describe('BetterValidation', () => {
  let component: BetterValidationConditionalExample;
  let fixture: ComponentFixture<BetterValidationConditionalExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetterValidationConditionalExample],
    }).compileComponents();

    fixture = TestBed.createComponent(BetterValidationConditionalExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
