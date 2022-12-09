import { TestBed } from '@angular/core/testing';

import { GraduateProgramService } from './graduate-programe.service';

describe('FormTemplateService', () => {
  let service: GraduateProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduateProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
