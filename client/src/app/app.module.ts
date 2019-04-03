import { NgModule } from '@angular/core';

import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { CustomMaterialModule } from './modules/custom-material.module';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ToolboxComponent
  ],
  imports: [
    CustomMaterialModule,
    KeyboardShortcutsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
