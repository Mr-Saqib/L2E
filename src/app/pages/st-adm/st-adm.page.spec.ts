import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StAdmPage } from './st-adm.page';

describe('StAdmPage', () => {
  let component: StAdmPage;
  let fixture: ComponentFixture<StAdmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StAdmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
