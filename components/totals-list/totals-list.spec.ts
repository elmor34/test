import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsList } from './totals-list';

describe('TotalsList', () => {
  let component: TotalsList;
  let fixture: ComponentFixture<TotalsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
