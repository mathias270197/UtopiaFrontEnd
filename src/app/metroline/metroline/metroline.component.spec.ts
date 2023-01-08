import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetrolineComponent } from './metroline.component';

describe('MetrolineComponent', () => {
  let component: MetrolineComponent;
  let fixture: ComponentFixture<MetrolineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetrolineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetrolineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
