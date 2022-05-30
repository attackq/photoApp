import { TestBed } from '@angular/core/testing';

import { CheckUserGuard } from './check-user.guard';

describe('CheckUserGuard', () => {
  let guard: CheckUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
