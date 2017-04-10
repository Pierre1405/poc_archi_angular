import { Component } from '@angular/core';

@Component({
  selector: 'ed-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class EdPageComponent {

}

@Component({
  selector: 'ed-page-title',
  templateUrl: 'pagetitle.component.html'
})
export class EdPageTitleComponent {

}

@Component({
  selector: 'ed-page-content',
  template: '<ng-content></ng-content>'
})
export class EdPageContentComponent {

}
