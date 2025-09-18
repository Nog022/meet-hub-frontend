import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaDetalheComponent } from './sala-detalhe.component';

describe('SalaDetalheComponent', () => {
  let component: SalaDetalheComponent;
  let fixture: ComponentFixture<SalaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
