export default function obex(obj) {
   return {
      map(keyMapper, valueMapper) {
         return extend(Object.keys(obj).reduce((acc, cur) => ({
            ...acc,
            [keyMapper(cur, obj[cur])]: valueMapper(obj[cur], cur),
         }), {}));
      },
      filter(fn) {
         return extend(Object.keys(obj).reduce((acc, cur) => ({
            ...acc,
            ...(fn(cur, obj[cur]) ? { [cur]: obj[cur] } : {}),
         }), {}));
      },
   };
}

function extend(obj) {
   const result = { ...obj };
   Object.defineProperty(result, 'map', {
      value: obex(result).map,
   });
   Object.defineProperty(result, 'filter', {
      value: obex(result).filter,
   });
   return result;
}
