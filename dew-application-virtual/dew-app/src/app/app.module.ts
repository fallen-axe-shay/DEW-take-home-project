import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeLinkFieldComponent } from './node-link-field/node-link-field.component';
import { FormsModule } from "@angular/forms";
import { DrawingBoardComponent } from './drawing-board/drawing-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContextMenuComponent, ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@NgModule({
  declarations: [
    AppComponent,
    NodeLinkFieldComponent,
    DrawingBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    ContextMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
