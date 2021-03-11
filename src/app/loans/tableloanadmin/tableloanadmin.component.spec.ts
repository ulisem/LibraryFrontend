import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableloanadminComponent } from './tableloanadmin.component';

describe('TableloanadminComponent', () => {
  let component: TableloanadminComponent;
  let fixture: ComponentFixture<TableloanadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableloanadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableloanadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
