import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@rinminase/ng-charts';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppComponent } from './components/transpiler-app/transpiler-app.component';
import { TranspilerHeaderComponent } from './components/transpiler-header/transpiler-header.component';
import { TranspilerCriteriaComponent } from './components/transpiler/transpiler-criteria/transpiler-criteria.component';
import { TranspilerMainComponent } from './components/transpiler/transpiler-main/transpiler-main.component';
import { CallFilterPipe } from './pipes/filter-pipes/call.pipe';
import { DictTransformPipe } from './pipes/transform-pipes/dictionary.pipe';
import { FTransformPipe } from './pipes/transform-pipes/ftransform.pipe';
import { DATA_DEFINITION } from './providers/data.provider';
import { DataService } from './services/data.service';
import { TransformService } from './services/transform.service';

@NgModule({
  declarations: [AppComponent, TranspilerHeaderComponent, TranspilerCriteriaComponent, TranspilerMainComponent, CallFilterPipe],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatTableModule,
    NgxWebstorageModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: DATA_DEFINITION.TOKEN, useValue: DATA_DEFINITION.instance },
    DataService,
    TransformService,
    DictTransformPipe,
    FTransformPipe
  ]
})
export class AppModule {}
