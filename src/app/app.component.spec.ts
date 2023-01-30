import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MockBuilder, MockedComponentFixture, MockRender, ngMocks} from "ng-mocks";
import {ContactDisplayComponent} from "./modules/contact-display/contact-display.component";
import {ContactService} from "./services/contact.service";
import {MatDialog} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ContactEditionComponent} from "./modules/contact-edition/contact-edition.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: MockedComponentFixture<AppComponent>;

  beforeEach(() =>
    MockBuilder(AppComponent)
    .mock(MatMenuModule)
    .mock(MatToolbarModule)
    .mock(MatIconModule)
    .mock(RouterModule)
  );

  beforeEach(() => {
    fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;
  });

  describe('test template', () => {
    it('should contain router-outlet', () => {
      expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull();
    });
  });
});
