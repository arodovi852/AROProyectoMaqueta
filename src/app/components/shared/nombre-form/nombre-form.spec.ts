import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreForm } from './nombre-form';

describe('NombreForm', () => {
  let component: NombreForm;
  let fixture: ComponentFixture<NombreForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NombreForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NombreForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
