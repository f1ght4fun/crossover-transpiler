import { Injectable } from '@angular/core';
import { first, sumBy } from 'lodash-es';
import { Agent } from '../interfaces/agent.interface';
import { Call } from '../interfaces/call.interface';
import { CallType } from '../interfaces/callType.interface';
import { Transcript, TransformedTranscript } from '../interfaces/transcript.interface';
import agents from '../mocks/agents.json';
import calls from '../mocks/calls.json';
import calltypes from '../mocks/calltype.json';
import transcripts from '../mocks/transscripts.json';

@Injectable()
export class DataService {
  private readonly agents: Agent[] = [];
  private readonly callTypes: CallType[] = [];
  private readonly calls: Call[] = [];
  private readonly transcripts: Transcript[] = [];

  get Agents(): Agent[] {
    return this.agents;
  }

  get CallTypes(): CallType[] {
    return this.callTypes;
  }

  get Calls(): Call[] {
    return this.calls;
  }

  constructor() {
    this.agents = agents;
    this.callTypes = calltypes;
    this.calls = calls;
    this.transcripts = [transcripts];
  }

  getTranscriptByCallById = (id: string): TransformedTranscript => {
    const transcript = first(this.transcripts.filter(c => c.call_id === id));

    return !!transcript ? this.transform(transcript) : undefined;
  }

  private transform = (obj: Transcript): TransformedTranscript => {
    const transformObj: TransformedTranscript = {
      call_id: obj.call_id,
      call_datetime: obj.call_datetime,
      duration: obj.duration
    };

    transformObj.expectedTalk = obj.script.map(i => ({
      order: i.order,
      speaker: 'Rep.',
      sentence: i.sentence,
      similarity: i.similarity
    }));

    const talkPeople = {};
    [...new Set(obj.transcript.map(i => i.channel))].forEach(ch => {
      if (ch === obj.customer[0].channel_no) {
        talkPeople[ch] = obj.customer[0].full_name;
      } else if (ch === obj.agent[0].channel_no) {
        talkPeople[ch] = agents.filter(i => i.agent_id === obj.agent[0].agent_id).map(i => i.full_name)?.[0];
      } else {
        talkPeople[ch] = '';
      }
    });

    const agentLines = obj.transcript.filter(el => el.channel === obj.agent[0].channel_no);

    transformObj.matching_percentage = (sumBy(agentLines, el => el.similarity) / agentLines.length) * 100;

    transformObj.realTalk = obj.transcript.map(i => ({
      time: `${Math.floor(i.timeFrom / 60)}:${i.timeFrom % 60 < 10 ? (i.timeFrom % 60) + '0' : i.timeFrom % 60}`,
      speaker: talkPeople[i.channel],
      sentence: i.sentence,
      matching_order: !!i.matching_sentence
        ? transformObj.expectedTalk.filter(j => j.sentence === i.matching_sentence)?.[0]?.order || -1
        : -1,
      matching_sentence: i.matching_sentence,
      similarity: i.similarity
    }));

    return transformObj;
  }
}
