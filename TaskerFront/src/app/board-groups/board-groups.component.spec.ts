import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGroupsComponent } from './board-groups.component';

describe('BoardGroupsComponent', () => {
  let component: BoardGroupsComponent;
  let fixture: ComponentFixture<BoardGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
