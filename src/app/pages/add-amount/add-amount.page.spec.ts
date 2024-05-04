import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAmountPage } from './add-amount.page';

describe('AddAmountPage', () => {
  let component: AddAmountPage;
  let fixture: ComponentFixture<AddAmountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddAmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
