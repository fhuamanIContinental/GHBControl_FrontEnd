import { TestBed } from '@angular/core/testing';

import { PersonGenderService } from './person-gender.service';

describe('PersonGenderService', () => {
  let service: PersonGenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonGenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
