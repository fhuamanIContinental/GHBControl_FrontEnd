import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPersonaComponent } from './mant-persona.component';

describe('MantPersonaComponent', () => {
  let component: MantPersonaComponent;
  let fixture: ComponentFixture<MantPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantPersonaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
