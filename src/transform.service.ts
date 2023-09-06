import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import {
  FieldType,
  IAction,
  IChangeType,
  IMoveAction,
  ISplitAction,
  Action,
} from './types';

@Injectable()
export class TransformerService {
  private actions: IAction[];

  constructor() {
    this.actions = this.getActions();
  }

  private getActions(): IAction[] {
    return [
      {
        action: Action.SPLIT,
        field: 'name',
        delimiter: ' ',
        to: ['firstName', 'lastName'],
      } as ISplitAction,
      {
        action: Action.MOVE,
        field: 'metadata.width',
        to: 'imageData.width',
      } as IMoveAction,
      {
        action: Action.CHANGE_TYPE,
        field: 'imageData.width',
        type: 'number',
      } as IChangeType,
      {
        action: Action.CHANGE_TYPE,
        field: 'metadata.creationDate',
        type: 'date',
      } as IChangeType,
    ];
  }
  private actionsDict: {
    [action in Action]: (action: IAction, entity: object) => object;
  } = {
    SPLIT: (action: ISplitAction, transformedEntity: object) => {
      return this.splitForFields(
        transformedEntity,
        action.field,
        action.delimiter,
        action.to,
      );
    },
    MOVE: (action: IMoveAction, transformedEntity: object) => {
      return this.moveField(transformedEntity, action.field, action.to);
    },
    CHANGE_TYPE: (action: IChangeType, transformedEntity: object) => {
      return this.changeFieldType(transformedEntity, action.field, action.type);
    },
  };

  transform(sourceEntity: object) {
    let transformedEntity = sourceEntity;
    for (const action of this.actions) {
      console.log(action.action)
      transformedEntity = this.actionsDict[action.action](
        action,
        transformedEntity,
      );
    }
    return transformedEntity;
  }

  private fieldTypeDict = {
    number: (value: any) => parseInt(value),
    string: (value: any) => String(value),
    date: (value: any) => new Date(value),
  };

  private splitForFields(
    entity: object,
    field: string,
    delimiter: string,
    fieldsForIndex: string[],
  ) {
    const value = entity[field];
    const splitted = value.split(delimiter);
    _.unset(entity, field);
    let i = 0;
    fieldsForIndex.forEach((field: string) => {
      entity = _.set(entity, field, splitted[i]);
      i++;
    });
    return entity;
  }

  private moveField(entity: object, field: string, to: string) {
    entity = _.set(entity, to, _.get(entity, field));
    _.unset(entity, field);
    return entity;
  }

  private addField(obj: object, path: string, value: any) {
    return _.set(obj, path, value);
  }

  private changeFieldType(entity: object, field: string, type: FieldType) {
    const value = _.get(entity, field);
    entity = _.set(entity, field, this.fieldTypeDict[type](value) );
    return entity;
  }
}
