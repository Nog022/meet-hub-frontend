import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizacaoDetalheComponent } from './localizacao-detalhe.component';

describe('LocalizacaoDetalheComponent', () => {
  let component: LocalizacaoDetalheComponent;
  let fixture: ComponentFixture<LocalizacaoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalizacaoDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizacaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
