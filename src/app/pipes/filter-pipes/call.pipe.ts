import { Pipe, PipeTransform } from '@angular/core';
import { Call } from '../../interfaces/call.interface';

@Pipe({
  name: 'callFilterPipe'
})
export class CallFilterPipe implements PipeTransform {
  transform(calls: Call[], selectedAgent: string, selectedType: string): Call[] {
    if (!selectedAgent || !selectedType) {
      return [];
    }

    return calls.filter(
      c => c.agent.map(i => i.agent_id).includes(selectedAgent) && (selectedType === 'all' || c.calltype_id === selectedType)
    );
  }
}
