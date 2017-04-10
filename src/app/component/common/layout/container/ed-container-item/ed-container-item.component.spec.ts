import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdContainerItemComponent } from './ed-container-item.component';

describe('EdContainerItemComponent', () => {
  let component: EdContainerItemComponent;
  let fixture: ComponentFixture<EdContainerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdContainerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdContainerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
