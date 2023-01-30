import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-edition',
  templateUrl: './contact-edition.component.html',
  styleUrls: ['./contact-edition.component.scss']
})
export class ContactEditionComponent {

  editionForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  constructor(private router: Router) {
    const navigation = router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      alert(state['firstName']);
    }
  }
}
