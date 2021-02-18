/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmallDataService } from './smallData.service';

describe('Service: SmallData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmallDataService]
    });
  });

  it('should ...', inject([SmallDataService], (service: SmallDataService) => {
    expect(service).toBeTruthy();
  }));
});
