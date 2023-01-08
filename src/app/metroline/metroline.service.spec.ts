import { TestBed } from '@angular/core/testing';

import { MetrolineService } from './metroline.service';

describe('MetrolineService', () => {
  let service: MetrolineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetrolineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
