import { TestBed } from '@angular/core/testing';

import { BonusService } from './bonus.service';

describe('BonusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BonusService = TestBed.get(BonusService);
    expect(service).toBeTruthy();
  });
});
