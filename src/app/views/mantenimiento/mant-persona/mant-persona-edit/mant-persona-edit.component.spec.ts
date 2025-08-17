import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPersonaEditComponent } from './mant-persona-edit.component';

describe('MantPersonaEditComponent', () => {
  let component: MantPersonaEditComponent;
  let fixture: ComponentFixture<MantPersonaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantPersonaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantPersonaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
