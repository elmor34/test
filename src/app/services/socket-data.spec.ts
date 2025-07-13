import { TestBed } from '@angular/core/testing';

import { SocketData } from './socket-data';

describe('SocketData', () => {
  let service: SocketData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
