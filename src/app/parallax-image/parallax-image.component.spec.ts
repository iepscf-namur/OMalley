import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxImageComponent } from './parallax-image.component';

describe('ParallaxImageComponent', () => {
  let component: ParallaxImageComponent;
  let fixture: ComponentFixture<ParallaxImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
