import {Component, Input, OnInit} from '@angular/core';
import {EdIObjectResource} from "../../../../services/dao/ressource/ressource.interface";

@Component({
  selector: 'ed-form-text-input',

  templateUrl: './ed-form-text-input-component.component.html',
  styleUrls: ['./ed-form-text-input-component.component.css']
})
export class EdFormTextInputComponent implements OnInit {

  @Input('name') attributeName: String;

  @Input() resource: EdIObjectResource;

  @Input() label: boolean|string;

  constructor() {

  }

  ngOnInit() {
  }

}
