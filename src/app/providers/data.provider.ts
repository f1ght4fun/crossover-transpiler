// tslint:disable:interface-over-type-literal
import { InjectionToken } from '@angular/core';
import agents from '../mocks/agents.json';
import calls from '../mocks/calls.json';
import calltypes from '../mocks/calltype.json';
import transcripts from '../mocks/transscripts.json';

export const DATA_DEFINITION_INSTANCE = {
  agents,
  calls,
  calltypes,
  transcripts
};
export type DataDefinitionType = typeof DATA_DEFINITION_INSTANCE;
export const DATA_DEFINITION_TOKEN = new InjectionToken<DataDefinitionType>('restart_system_config_definition');

export const DATA_DEFINITION: {
  TOKEN: InjectionToken<DataDefinitionType>;
  instance: DataDefinitionType;
} = {
  TOKEN: DATA_DEFINITION_TOKEN,
  instance: DATA_DEFINITION_INSTANCE
};
