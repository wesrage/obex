export default function obex(obj) {
   const entryTransformer = entryFunction =>
      extend(Object.keys(obj).reduce((acc, cur) => ({
         ...acc,
         ...entryFunction(cur),
      }), {}));
   return {
      map: (keyMapper, valueMapper) => entryTransformer(key => ({
         [keyMapper(key, obj[key])]: valueMapper(obj[key], key),
      })),
      mapKeys: keyMapper => entryTransformer(key => ({
         [keyMapper(key, obj[key])]: obj[key],
      })),
      mapValues: valueMapper => entryTransformer(key => ({
         [key]: valueMapper(obj[key], key),
      })),
      filter: testFunction => entryTransformer(key => ({
         ...(testFunction(key, obj[key]) ? { [key]: obj[key] } : {}),
      })),
      toArray: entryMapper => Object.keys(obj).map(key => entryMapper(key, obj[key])),
      keys: () => Object.keys(obj),
      values: () => Object.keys(obj).map(key => obj[key]),
      raw: () => removeProperties(obj),
   };
}

const addedPropertyNames = Object.keys(obex({}));

function extend(obj) {
   const result = { ...obj };
   addedPropertyNames.forEach(propName => {
      Object.defineProperty(result, propName, {
         configurable: true,
         value: obex(result)[propName],
      });
   });
   return result;
}

function removeProperties(obj) {
   const result = { ...obj };
   addedPropertyNames.forEach(propName => delete result[propName]);
   return result;
}
