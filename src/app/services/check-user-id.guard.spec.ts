import { TestBed } from '@angular/core/testing';

import { CheckUserIdGuard } from './check-user-id.guard';

describe('CheckUserIdGuard', () => {
  let guard: CheckUserIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckUserIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
