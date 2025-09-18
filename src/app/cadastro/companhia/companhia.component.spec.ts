import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanhiaComponent } from './companhia.component';

describe('CompanhiaComponent', () => {
  let component: CompanhiaComponent;
  let fixture: ComponentFixture<CompanhiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanhiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanhiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
