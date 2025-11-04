import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterDisableConditionalExample } from './better-disable-conditional-example';

describe('BetterDisableConditionalExample', () => {
  let component: BetterDisableConditionalExample;
  let fixture: ComponentFixture<BetterDisableConditionalExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetterDisableConditionalExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetterDisableConditionalExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
