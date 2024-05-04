import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StDetailsPage } from './st-details.page';

describe('StDetailsPage', () => {
  let component: StDetailsPage;
  let fixture: ComponentFixture<StDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
