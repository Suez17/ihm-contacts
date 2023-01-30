import { DeletionConfirmationDialogComponent } from './deletion-confirmation-dialog.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { MatDialogModule } from '@angular/material/dialog';

describe('DeletionConfirmationDialogComponent', () => {
  let component: DeletionConfirmationDialogComponent;
  let fixture: MockedComponentFixture<DeletionConfirmationDialogComponent>;

  beforeEach(() =>
    MockBuilder(DeletionConfirmationDialogComponent).mock(MatDialogModule)
  );

  beforeEach(() => {
    fixture = MockRender(DeletionConfirmationDialogComponent);
    component = fixture.point.componentInstance;
  });

  describe('test template', () => {
    it('should contain two buttons', () => {
      expect(fixture.nativeElement.querySelectorAll('button').length).toBe(2);
    });
  });
});
