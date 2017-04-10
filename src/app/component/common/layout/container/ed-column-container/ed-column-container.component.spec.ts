import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdColumnContainerComponent } from './ed-column-container.component';

describe('EdColumnContainerComponent', () => {
  let component: EdColumnContainerComponent;
  let fixture: ComponentFixture<EdColumnContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdColumnContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdColumnContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
