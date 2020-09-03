export interface Call {
  call_id: string;
  calltype_id: string;
  call_start_time: string;
  agent: CallAgent[];
  customer: CallCustomer[];
  gs_file_url?: string;
  duration: number;
}

export interface CallAgent {
  agent_id: string;
  channel_no: number;
}

export interface CallCustomer {
  full_name: string;
  channel_no: number;
}
