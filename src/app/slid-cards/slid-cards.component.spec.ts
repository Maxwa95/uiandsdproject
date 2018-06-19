import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidCardsComponent } from './slid-cards.component';

describe('SlidCardsComponent', () => {
  let component: SlidCardsComponent;
  let fixture: ComponentFixture<SlidCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
