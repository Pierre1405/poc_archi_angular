import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdFormTextInputComponent } from './ed-form-text-input-component.component';
import {FormsModule} from "@angular/forms";
import {EdRessourceFactory, EdUnknownObjectResource} from "../../../../services/dao/ressource/ressource.impl";
import {DataDictionnary} from "../../../../services/dao/ressource/datadictionary.impl";

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

  it('should display property value', () => {
    fixture = TestBed.createComponent(EdFormTextInputComponent);
    component = fixture.componentInstance;
    debugger;
    const resource = new EdUnknownObjectResource(null, null, {
        type: null,
        propertyName: null,
        ownerObjectDef: null,
        objectDef: DataDictionnary.getInstance().getObjectDefinition("Person"),
        isMultival: false
    });
    resource.setProperty("PerName", "toto");

    component.resource = resource;
    component.attributeName = "PerName";

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("input").value).toEqual("toto");

    /*
     const fixture = TestBed.createComponent(AppComponent);
     fixture.detectChanges();
     const compiled = fixture.debugElement.nativeElement;
     expect(compiled.querySelector('h1').textContent).toContain('app works!');
     */
  });
});
