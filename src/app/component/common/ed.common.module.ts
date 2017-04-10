import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {EdPageTitleComponent, EdPageContentComponent, EdPageComponent} from "./layout/page.component";
import { EdFormTextInputComponent } from './form/ed-form-text-input-component/ed-form-text-input-component.component';
import { EdColumnContainerComponent } from './layout/container/ed-column-container/ed-column-container.component';
import { EdContainerItemComponent } from './layout/container/ed-container-item/ed-container-item.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EdPageTitleComponent,
    EdPageComponent,
    EdPageContentComponent,
    EdFormTextInputComponent,
    EdColumnContainerComponent,
    EdContainerItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    EdPageTitleComponent,
    EdPageComponent,
    EdPageContentComponent,
    EdFormTextInputComponent,
    EdColumnContainerComponent,
    EdContainerItemComponent
  ]
})
export class EdCommonModule { }
