import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteupdateComponent } from './deleteupdate.component';

describe('DeleteupdateComponent', () => {
  let component: DeleteupdateComponent;
  let fixture: ComponentFixture<DeleteupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
