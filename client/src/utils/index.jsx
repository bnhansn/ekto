import mapKeys from 'lodash/mapKeys';

export function decamelize(str) {
  return str.split(/(?=[A-Z])/).join('_').toLowerCase();
}

export function keyTransform(data) {
  const obj = {};
  mapKeys(data, (value, key) => {
    obj[decamelize(key)] = value;
  });
  return obj;
}
