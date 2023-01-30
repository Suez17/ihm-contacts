import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditionComponent } from './contact-edition.component';

describe('ContactEditionComponent', () => {
  let component: ContactEditionComponent;
  let fixture: ComponentFixture<ContactEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactEditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
