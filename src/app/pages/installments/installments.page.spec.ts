import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstallmentsPage } from './installments.page';

describe('InstallmentsPage', () => {
  let component: InstallmentsPage;
  let fixture: ComponentFixture<InstallmentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstallmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
