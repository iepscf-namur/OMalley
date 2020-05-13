import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin-guard.component';

describe('AdminGuard', () => {
  let component: AdminGuard;
  let fixture: ComponentFixture<AdminGuard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGuard ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
