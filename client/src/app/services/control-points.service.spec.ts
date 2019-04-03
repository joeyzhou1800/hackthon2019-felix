import { TestBed } from '@angular/core/testing';

import { ControlPointsService } from './control-points.service';

describe('ControlPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlPointsService = TestBed.get(ControlPointsService);
    expect(service).toBeTruthy();
  });
});
