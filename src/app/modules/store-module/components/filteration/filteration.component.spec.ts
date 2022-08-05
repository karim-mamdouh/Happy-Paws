import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterationComponent } from './filteration.component';

describe('FilterationComponent', () => {
  let component: FilterationComponent;
  let fixture: ComponentFixture<FilterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
