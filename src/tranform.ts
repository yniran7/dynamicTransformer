import * as _ from 'lodash'

function splitForFields(
  value: string,
  splitBy: string,
  fieldsForIndex: string[],
) {
  let obj = {};
  const splited = value.split(splitBy);
  let i = 0;
  fieldsForIndex.forEach((field: string) => {
    obj = { ...obj, [field]: splited[i] };
    i++;
  });
  return obj;
}
;
function addFields(obj: object, newFields: object) {
  return { ...obj, ...newFields };
}

function addField(obj: object, path: string, value: any){
    return _.set(obj, path, value);
}
