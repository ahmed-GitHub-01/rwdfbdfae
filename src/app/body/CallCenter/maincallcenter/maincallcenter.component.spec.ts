/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaincallcenterComponent } from './maincallcenter.component';

describe('MaincallcenterComponent', () => {
  let component: MaincallcenterComponent;
  let fixture: ComponentFixture<MaincallcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaincallcenterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincallcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
