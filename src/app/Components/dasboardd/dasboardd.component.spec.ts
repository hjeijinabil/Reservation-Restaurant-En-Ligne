import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboarddComponent } from './dasboardd.component';

describe('DasboarddComponent', () => {
  let component: DasboarddComponent;
  let fixture: ComponentFixture<DasboarddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DasboarddComponent]
    });
    fixture = TestBed.createComponent(DasboarddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
