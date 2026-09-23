import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RootTest } from './root-test';

describe('RootTest', () => {
  let component: RootTest;
  let fixture: ComponentFixture<RootTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootTest],
    }).compileComponents();

    fixture = TestBed.createComponent(RootTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
