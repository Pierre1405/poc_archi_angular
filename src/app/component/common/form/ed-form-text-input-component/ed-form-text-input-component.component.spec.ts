import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { EdFormTextInputComponent } from './ed-form-text-input-component.component';
import {FormsModule} from "@angular/forms";
import {
  EdDaoRessourceFactory, EdDaoUnknownObjectResource,
  EdDaoUnknowPrimitiveRessource
} from "../../../../services/dao/ressource/resource.impl";
import {DataDictionnary, FieldType} from "../../../../services/dao/ressource/datadictionary.impl";

describe('EdFormTextInputComponent', () => {
  let component: EdFormTextInputComponent;
  let fixture: ComponentFixture<EdFormTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EdFormTextInputComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdFormTextInputComponent);
    component = fixture.componentInstance;
    component.resource = new EdDaoUnknowPrimitiveRessource(null, "PerName");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display property value', fakeAsync(() => {
    fixture = TestBed.createComponent(EdFormTextInputComponent);
    component = fixture.componentInstance;
    const resource = new EdDaoUnknowPrimitiveRessource(null, "PerName");
    component.resource = resource;

    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    tick();
    expect(compiled.querySelector("input").value).toEqual("");

    resource.setValue("Test Value");
    fixture.detectChanges();
    tick();
    expect(compiled.querySelector("input").value).toEqual("Test Value");

  }));
});
