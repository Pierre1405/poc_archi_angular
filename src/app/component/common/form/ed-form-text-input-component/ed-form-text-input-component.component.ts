import {Component, Input, OnInit} from "@angular/core";
import {EdIPrimitiveRessource} from "../../../../services/dao/ressource/resource.interface";

@Component({
  selector: 'ed-form-text-input',

  templateUrl: './ed-form-text-input-component.component.html',
  styleUrls: ['./ed-form-text-input-component.component.css']
})
export class EdFormTextInputComponent implements OnInit {

  @Input() resource: EdIPrimitiveRessource;

  @Input() label: boolean|string;

  constructor() {

  }

  ngOnInit() {
  }

}
