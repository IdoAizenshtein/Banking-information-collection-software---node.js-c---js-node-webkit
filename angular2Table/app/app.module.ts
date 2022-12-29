import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }   from './app.component';
import { RowsFilterPipe } from './filter.pipe';
import { RowsSortPipe } from './sort.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        RowsFilterPipe,
        RowsSortPipe
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
