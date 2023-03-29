import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootsrapElementComponent } from './bootsrap-element.component';

describe('BootsrapElementComponent', () => {
  let component: BootsrapElementComponent;
  let fixture: ComponentFixture<BootsrapElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootsrapElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootsrapElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
