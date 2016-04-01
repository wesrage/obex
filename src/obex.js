export default function obex(obj) {
   return {
      map(keyMapper, valueMapper) {
         return extend(Object.keys(obj).reduce((acc, cur) => ({
            ...acc,
            [keyMapper(cur, obj[cur])]: valueMapper(obj[cur], cur),
         }), {}));
      },
      mapKeys(keyMapper) {
         return extend(Object.keys(obj).reduce((acc, cur) => ({
            ...acc,
            [keyMapper(cur, obj[cur])]: obj[cur],
         }), {}));
      },
      mapValues(valueMapper) {
         return extend(Object.keys(obj).reduce((acc, cur) => ({
            ...acc,
            [cur]: valueMapper(obj[cur], cur),
         }), {}));
      },
      filter(fn) {
         return extend(Object.keys(obj).reduce((acc, cur) => ({
            ...acc,
            ...(fn(cur, obj[cur]) ? { [cur]: obj[cur] } : {}),
         }), {}));
      },
      raw() {
         return removeProperties(obj);
      },
   };
}

function extend(obj) {
   const result = { ...obj };
   Object.defineProperty(result, 'map', {
      configurable: true,
      value: obex(result).map,
   });
   Object.defineProperty(result, 'mapKeys', {
      configurable: true,
      value: obex(result).mapKeys,
   });
   Object.defineProperty(result, 'mapValues', {
      configurable: true,
      value: obex(result).mapValues,
   });
   Object.defineProperty(result, 'filter', {
      configurable: true,
      value: obex(result).filter,
   });
   Object.defineProperty(result, 'raw', {
      configurable: true,
      value: obex(result).raw,
   });
   return result;
}

function removeProperties(obj) {
   const result = { ...obj };
   delete result.map;
   delete result.mapKeys;
   delete result.mapValues;
   delete result.filter;
   delete result.raw;
   return result;
}
