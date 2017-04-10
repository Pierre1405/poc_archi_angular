import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ed-column-container',
  templateUrl: './ed-column-container.component.html',
  styleUrls: ['./ed-column-container.component.css']
})
export class EdColumnContainerComponent implements OnInit {
  private items: Array<String> = ["123", "456"];
  constructor() {

  }

  ngOnInit() {
  }

}
