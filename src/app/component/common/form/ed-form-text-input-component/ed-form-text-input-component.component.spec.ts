import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdFormTextInputComponent } from './ed-form-text-input-component.component';
import {FormsModule} from "@angular/forms";
import {EdRessourceFactory, EdUnknownObjectResource} from "../../../../services/dao/ressource/ressource.impl";

describe('EdFormTextInputComponent', () => {
  let component: EdFormTextInputComponent;
  let fixture: ComponentFixture<EdFormTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EdFormTextInputComponent
      ],
      imports:[
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdFormTextInputComponent);
    component = fixture.componentInstance;
    component.resource = EdRessourceFactory.getInstance().getResource("Person", null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
