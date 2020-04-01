/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ValueAddComponent } from './value-add.component';

describe('ValueAddComponent', () => {
  let component: ValueAddComponent;
  let fixture: ComponentFixture<ValueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
