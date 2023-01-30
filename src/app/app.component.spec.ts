import { AppComponent } from './app.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
      expect(
        fixture.nativeElement.querySelector('router-outlet')
      ).not.toBeNull();
    });
  });
});
