/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CallCenterService } from './callCenter.service';

describe('Service: CallCenter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CallCenterService]
    });
  });

  it('should ...', inject([CallCenterService], (service: CallCenterService) => {
    expect(service).toBeTruthy();
  }));
});
