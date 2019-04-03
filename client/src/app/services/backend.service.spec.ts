import { TestBed } from '@angular/core/testing';

import { BackendFileService } from './backend-file.service';

describe('BackendFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendFileService = TestBed.get(BackendFileService);
    expect(service).toBeTruthy();
  });
});
