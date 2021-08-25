import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeLinkFieldComponent } from './node-link-field.component';

describe('NodeLinkFieldComponent', () => {
  let component: NodeLinkFieldComponent;
  let fixture: ComponentFixture<NodeLinkFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeLinkFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeLinkFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
