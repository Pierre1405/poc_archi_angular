import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdFormTextInputComponent } from './ed-form-text-input-component.component';

describe('EdFormTextInputComponent', () => {
  let component: EdFormTextInputComponent;
  let fixture: ComponentFixture<EdFormTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdFormTextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdFormTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
