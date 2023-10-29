import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryregComponent } from './secondaryreg.component';

describe('SecondaryregComponent', () => {
  let component: SecondaryregComponent;
  let fixture: ComponentFixture<SecondaryregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryregComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
