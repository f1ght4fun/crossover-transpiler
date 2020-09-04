import { Inject, Injectable } from '@angular/core';
import { sumBy } from 'lodash-es';
import { Agent } from '../interfaces/agent.interface';
import { Call } from '../interfaces/call.interface';
import { CallType } from '../interfaces/callType.interface';
import { Transcript, TransformedTranscript } from '../interfaces/transcript.interface';
import { DataDefinitionType, DATA_DEFINITION } from '../providers/data.provider';
import { TransformService } from './transform.service';

@Injectable()
export class DataService {
  get Agents(): Agent[] {
    return this.data.agents;
  }

  get CallTypes(): CallType[] {
    return this.data.calltypes;
  }

  get Calls(): Call[] {
    return this.data.calls;
  }

  constructor(@Inject(DATA_DEFINITION.TOKEN) private data: DataDefinitionType, private transformService: TransformService) {}

  getTranscriptByCallById = (id: string): TransformedTranscript => {
    const transform = (obj: Transcript): TransformedTranscript => {
      const transformObj: TransformedTranscript = {
        call_id: obj.call_id,
        call_datetime: obj.call_datetime,
        duration: obj.duration,
        expectedTalk: obj.script.map(i => ({
          order: i.order,
          speaker: 'Rep.',
          sentence: i.sentence,
          similarity: i.similarity
        }))
      };

      const recordingParticipants = {};
      [...new Set(obj.transcript.map(i => i.channel))].forEach(ch => {
        if (ch === obj.customer[0].channel_no) {
          recordingParticipants[ch] = obj.customer[0].full_name;
        } else if (ch === obj.agent[0].channel_no) {
          recordingParticipants[ch] = this.data.agents.filter(i => i.agent_id === obj.agent[0].agent_id).map(i => i.full_name)?.[0];
        } else {
          recordingParticipants[ch] = '';
        }
      });

      const agentLines = obj.transcript.filter(el => el.channel === obj.agent[0].channel_no);
      transformObj.matching_percentage = (sumBy(agentLines, el => el.similarity) / agentLines.length) * 100;

      transformObj.realTalk = obj.transcript.map(i => ({
        time: `${Math.floor(i.timeFrom / 60)}:${i.timeFrom % 60 < 10 ? (i.timeFrom % 60) + '0' : i.timeFrom % 60}`,
        speaker: recordingParticipants[i.channel],
        sentence: i.sentence,
        matching_order: !!i.matching_sentence
          ? transformObj.expectedTalk.filter(j => j.sentence === i.matching_sentence)?.[0]?.order || -1
          : -1,
        matching_sentence: i.matching_sentence,
        similarity: i.similarity
      }));

      return transformObj;
    };

    const transformedTranscripts = this.transformService.transform<Transcript, TransformedTranscript>(
      [this.data.transcripts].filter(c => c.call_id === id),
      transform
    );

    return transformedTranscripts.length > 0 ? transformedTranscripts[0] : undefined;
  }
}
