import { TestBed } from '@angular/core/testing';

import { FtService } from './ft.service';

describe('FtService', () => {
  let service: FtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
