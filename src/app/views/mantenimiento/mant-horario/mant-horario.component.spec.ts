import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantHorarioComponent } from './mant-horario.component';

describe('MantHorarioComponent', () => {
  let component: MantHorarioComponent;
  let fixture: ComponentFixture<MantHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
