import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDisplayComponent } from './modules/contact-display/contact-display.component';
import { ContactEditionComponent } from './modules/contact-edition/contact-edition.component';

export const routes: Routes = [
  { path: 'display', component: ContactDisplayComponent },
  { path: 'edition', component: ContactEditionComponent },
  { path: 'creation', component: ContactEditionComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'display' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
