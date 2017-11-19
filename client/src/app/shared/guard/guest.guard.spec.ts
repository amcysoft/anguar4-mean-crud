import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GuestGuard } from './guest.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [GuestGuard]
    });
  });

  it('should ...', inject([GuestGuard], (guard: GuestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
