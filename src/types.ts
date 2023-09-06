export interface IAction {
  action: Action;
  field: string;
}

export interface ISplitAction extends IAction {
  delimiter: string;
  to: string[];
}

export interface IMoveAction extends IAction {
  to: string;
}

export interface IChangeType extends IAction {
  type: FieldType;
}

export type FieldType = 'number' | 'string' | 'date';

export enum Action {
  SPLIT = 'SPLIT',
  MOVE = 'MOVE',
  CHANGE_TYPE = 'CHANGE_TYPE',
}
