import { TestBed } from '@angular/core/testing';

import { MantPersonaService } from './mant-persona.service';

describe('MantPersonaService', () => {
  let service: MantPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
