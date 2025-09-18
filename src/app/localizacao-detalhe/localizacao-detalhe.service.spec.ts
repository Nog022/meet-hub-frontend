/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalizacaoDetalheService } from './localizacao-detalhe.service';

describe('Service: LocalizacaoDetalhe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizacaoDetalheService]
    });
  });

  it('should ...', inject([LocalizacaoDetalheService], (service: LocalizacaoDetalheService) => {
    expect(service).toBeTruthy();
  }));
});
