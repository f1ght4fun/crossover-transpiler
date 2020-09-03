export interface Transcript {
  call_id: string;
  calltype_id: string;
  file_url: string;
  call_datetime: string;
  duration: number;
  agent: CallAgent[];
  customer: CallCustomer[];
  script: ScriptRec[];
  transcript: TranscriptRec[];
}

export interface CallAgent {
  agent_id: string;
  channel_no: number;
}

export interface CallCustomer {
  full_name: string;
  channel_no: number;
}

export interface ScriptRec {
  order: number;
  similarity: number;
  sentence: string;
  matching_sentence: string;
}

export interface TranscriptRec extends ScriptRec {
  channel: number;
  timeFrom: number;
  timeTo: number;
}

export interface TransformedTranscript {
  call_id: string;
  call_datetime: string;
  matching_percentage?: number;
  duration: number;
  expectedTalk?: ExpectedTalk[];
  realTalk?: RealTalk[];
}

export interface Talk {
  speaker: string;
  sentence: string;
  similarity: number;
}

export interface ExpectedTalk extends Talk {
  order: number;
}

export interface RealTalk extends Talk {
  time: string;
  matching_order: number;
  matching_sentence: string;
}
