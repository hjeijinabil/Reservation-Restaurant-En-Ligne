import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivacySettingComponent } from './user-privacy-setting.component';

describe('UserPrivacySettingComponent', () => {
  let component: UserPrivacySettingComponent;
  let fixture: ComponentFixture<UserPrivacySettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPrivacySettingComponent]
    });
    fixture = TestBed.createComponent(UserPrivacySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
