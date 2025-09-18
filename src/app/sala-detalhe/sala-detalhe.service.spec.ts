import { TestBed } from '@angular/core/testing';

import { SalaDetalheService } from './sala-detalhe.service';

describe('SalaDetalheService', () => {
  let service: SalaDetalheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaDetalheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
