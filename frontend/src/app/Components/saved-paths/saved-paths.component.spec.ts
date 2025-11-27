import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPathsComponent } from './saved-paths.component';

describe('SavedPathsComponent', () => {
  let component: SavedPathsComponent;
  let fixture: ComponentFixture<SavedPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPathsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
