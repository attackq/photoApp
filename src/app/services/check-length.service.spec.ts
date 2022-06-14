import { TestBed } from '@angular/core/testing';

import { CheckLengthService } from './check-length.service';

describe('CheckLengthService', () => {
  let service: CheckLengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckLengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
