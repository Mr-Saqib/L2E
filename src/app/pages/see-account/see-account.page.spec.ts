import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeAccountPage } from './see-account.page';

describe('SeeAccountPage', () => {
  let component: SeeAccountPage;
  let fixture: ComponentFixture<SeeAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeeAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
