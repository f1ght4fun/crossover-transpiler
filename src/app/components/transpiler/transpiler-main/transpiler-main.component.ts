import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { SingleDataSet } from 'ng2-charts';
import { RealTalk, TransformedTranscript } from 'src/app/interfaces/transcript.interface';

@Component({
  selector: 'app-transpiler-main',
  templateUrl: './transpiler-main.component.html',
  styleUrls: ['./transpiler-main.component.scss']
})
export class TranspilerMainComponent {
  transcript: TransformedTranscript = undefined;

  @Input() set Transcript(value: TransformedTranscript) {
    this.transcript = value;
    if (!!this.transcript) {
      this.realPieChartData = [this.transcript.matching_percentage, 100 - this.transcript.matching_percentage];
    }
  }
  @Input() sensitivity: number;

  readonly displayedColumns: string[] = ['time', 'speaker', 'sentence'];
  readonly repDisplayedColumns: string[] = ['order', 'speaker', 'sentence'];

  readonly pieChartOptions: ChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false
    },
    legend: {
      display: false
    }
  };
  readonly pieChartColors = [
    {
      backgroundColor: ['black', 'white']
    }
  ];
  expectedPieChartData: SingleDataSet = [100];
  realPieChartData: SingleDataSet = [];

  getTooltipText = (row: RealTalk): string => {
    return `${row.similarity * 100}% matching with line #${row.matching_order} "${row.matching_sentence}"`;
  }
}
