import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupRolesComponent } from './view-group-roles.component';

describe('ViewGroupRolesComponent', () => {
  let component: ViewGroupRolesComponent;
  let fixture: ComponentFixture<ViewGroupRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGroupRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
