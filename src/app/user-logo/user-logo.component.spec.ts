import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogoComponent } from './user-logo.component';

describe('UserLogoComponent', () => {
  let component: UserLogoComponent;
  let fixture: ComponentFixture<UserLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
