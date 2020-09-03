import { Component } from '@angular/core';
import { TransformedTranscript } from 'src/app/interfaces/transcript.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-widget',
  templateUrl: './transpiler-app.component.html',
  styleUrls: ['./transpiler-app.component.scss']
})
export class AppComponent {
  transcript: TransformedTranscript = undefined;
  sensitivity = 0;

  constructor(public dataSrv: DataService) {}

  criteriaChangedHandler = (value: { call_id: string; sensitivity: number }) => {
    this.sensitivity = value.sensitivity / 100;
    this.transcript = this.dataSrv.getTranscriptByCallById(value.call_id);
  }
}
