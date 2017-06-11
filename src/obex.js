const assign = Object.assign;
const keys = Object.keys;

export default function obex(obj) {
   const entryTransformer = entryFunction =>
      extend(
         keys(obj).reduce(
            (acc, cur) => assign({}, acc, entryFunction(cur)),
            {}
         )
      );
   return {
      map: (keyMapper, valueMapper) =>
         entryTransformer(key => ({
            [keyMapper(key, obj[key])]: valueMapper(obj[key], key),
         })),
      mapKeys: keyMapper =>
         entryTransformer(key => ({
            [keyMapper(key, obj[key])]: obj[key],
         })),
      mapValues: valueMapper =>
         entryTransformer(key => ({
            [key]: valueMapper(obj[key], key),
         })),
      filter: testFunction =>
         entryTransformer(
            key => (testFunction(key, obj[key]) ? { [key]: obj[key] } : {})
         ),
      toArray: entryMapper =>
         keys(obj).map(key => entryMapper(key, obj[key])),
      keys: () => keys(obj),
      values: () => keys(obj).map(key => obj[key]),
      raw: () => removeProperties(obj),
   };
}

const propertyNames = keys(obex({}));

function extend(obj) {
   const result = assign({}, obj);
   propertyNames.forEach(propName => {
      Object.defineProperty(result, propName, {
         configurable: true,
         value: obex(result)[propName],
      });
   });
   return result;
}

function removeProperties(obj) {
   const result = assign({}, obj);
   propertyNames.forEach(propName => delete result[propName]);
   return result;
}
