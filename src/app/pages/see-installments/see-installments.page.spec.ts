import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeInstallmentsPage } from './see-installments.page';

describe('SeeInstallmentsPage', () => {
  let component: SeeInstallmentsPage;
  let fixture: ComponentFixture<SeeInstallmentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeeInstallmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
