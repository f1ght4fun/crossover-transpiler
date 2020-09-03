import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transpiler-criteria',
  templateUrl: './transpiler-criteria.component.html',
  styleUrls: ['./transpiler-criteria.component.scss']
})
export class TranspilerCriteriaComponent {
  @Output() criteriaChanged: EventEmitter<{ call_id: string; sensitivity: number }> = new EventEmitter<{
    call_id: string;
    sensitivity: number;
  }>(undefined);

  criteriaModel: Partial<{ agent_id: string; calltype_id: string; call_id: string; sensitivity: number }> = {
    calltype_id: 'all',
    sensitivity: 38
  };

  get AgentID(): string {
    return this.criteriaModel.agent_id;
  }

  set AgentID(value: string) {
    this.criteriaModel = { agent_id: value, calltype_id: 'all', call_id: undefined, sensitivity: 38 };
    this.criteriaChanged.emit({ call_id: undefined, sensitivity: this.criteriaModel.sensitivity });
  }

  get CallType(): string {
    return this.criteriaModel.calltype_id;
  }

  set CallType(value: string) {
    this.criteriaModel = { agent_id: this.criteriaModel.agent_id, calltype_id: value, call_id: undefined, sensitivity: 38 };
    this.criteriaChanged.emit({ call_id: undefined, sensitivity: this.criteriaModel.sensitivity });
  }

  get Call(): string {
    return this.criteriaModel.call_id;
  }

  set Call(value: string) {
    this.criteriaModel.call_id = value;
    this.criteriaChanged.emit({ call_id: value, sensitivity: this.criteriaModel.sensitivity });
  }

  get Sensitivity(): number {
    return this.criteriaModel.sensitivity;
  }

  set Sensitivity(value: number) {
    this.criteriaModel.sensitivity = value;
    this.criteriaChanged.emit({ call_id: this.criteriaModel.call_id, sensitivity: value });
  }

  constructor(public dataSrv: DataService) {}
}
