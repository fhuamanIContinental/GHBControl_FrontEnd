import { TestBed } from '@angular/core/testing';

import { PersonTypeDocumentService } from './person-type-document.service';

describe('PersonTypeDocumentService', () => {
  let service: PersonTypeDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonTypeDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
