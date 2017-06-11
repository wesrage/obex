import obex from '../obex';

const simpleObj = {
   a: 1,
   b: 2,
   c: 3,
   d: 4,
};

describe('obex.map()', () => {
   it('returns the same object when called with identity functions', () => {
      const identity = arg => arg;
      const result = obex(simpleObj).map(identity, identity);
      expect(result).toEqual(simpleObj);
   });

   it('maps keys and values', () => {
      const result = obex(simpleObj).map(
         key => key + key,
         value => value + 1
      );
      expect(result).toEqual({
         aa: 2,
         bb: 3,
         cc: 4,
         dd: 5,
      });
   });

   it('supports using values in key-mapping function and vice versa', () => {
      const result = obex(simpleObj).map(
         (key, value) => value,
         (value, key) => key
      );
      expect(result).toEqual({
         1: 'a',
         2: 'b',
         3: 'c',
         4: 'd',
      });
   });
});

describe('obex.mapKeys()', () => {
   it('returns the same object when called with identity functions', () => {
      const identity = arg => arg;
      const result = obex(simpleObj).mapKeys(identity);
      expect(result).toEqual(simpleObj);
   });

   it('maps keys', () => {
      const result = obex(simpleObj).mapKeys(
         key => key + key
      );
      expect(result).toEqual({
         aa: 1,
         bb: 2,
         cc: 3,
         dd: 4,
      });
   });

   it('supports using values in key-mapping function', () => {
      const result = obex(simpleObj).mapKeys(
         (key, value) => key + value
      );
      expect(result).toEqual({
         a1: 1,
         b2: 2,
         c3: 3,
         d4: 4,
      });
   });
});

describe('obex.mapValues()', () => {
   it('returns the same object when called with identity functions', () => {
      const identity = arg => arg;
      const result = obex(simpleObj).mapValues(identity);
      expect(result).toEqual(simpleObj);
   });

   it('maps values', () => {
      const square = x => x * x;
      const result = obex(simpleObj).mapValues(square);
      expect(result).toEqual({
         a: 1,
         b: 4,
         c: 9,
         d: 16,
      });
   });

   it('supports using keys in value-mapping function', () => {
      const result = obex(simpleObj).mapValues(
         (value, key) => value + key
      );
      expect(result).toEqual({
         a: '1a',
         b: '2b',
         c: '3c',
         d: '4d',
      });
   });
});

describe('obex.filter()', () => {
   it('returns the same object when called with universally permissive filter function', () => {
      const permitter = () => true;
      const result = obex(simpleObj).filter(permitter);
      expect(result).toEqual(simpleObj);
   });

   it('filters objects properly', () => {
      const result = obex(simpleObj).filter((key, value) => value % 2 === 0);
      expect(result).toEqual({
         b: 2,
         d: 4,
      });
   });
});

describe('obex chaining', () => {
   it('chains directly', () => {
      const result = obex(simpleObj)
         .map(key => key + key, value => value + 1)
         .filter((key, value) => value % 2 === 0)
         .map(key => key, value => value);
      expect(result).toEqual({
         aa: 2,
         cc: 4,
      });
   });

   it('should not add enumerable properties during chaining', () => {
      const extendedObj = obex({})
         .filter(() => true)
         .map(key => key, value => value);
      expect(extendedObj).toEqual({});
      for (const prop in extendedObj) {
         expect(prop).not.toBe('filter');
         expect(prop).not.toBe('map');
         expect(prop).not.toBe('raw');
      }
   });
});

describe('obex.raw()', () => {
   it('should remove added properties from extended objects', () => {
      const extendedObj = obex({})
         .filter(() => true)
         .map(key => key, value => value);
      const rawObj = extendedObj.raw();

      expect(extendedObj).toHaveProperty('filter');
      expect(extendedObj).toHaveProperty('map');
      expect(extendedObj).toHaveProperty('raw');
      expect(rawObj).not.toHaveProperty('filter');
      expect(rawObj).not.toHaveProperty('map');
      expect(rawObj).not.toHaveProperty('raw');
   });
});

describe('obex.toArray()', () => {
   it('should map an object to an array using given mapping function', () => {
      const combinedArray = obex(simpleObj)
         .toArray((key, value) => key + value);
      expect(combinedArray).toEqual(['a1', 'b2', 'c3', 'd4']);
   });
});

describe('obex.keys()', () => {
   const keys = obex(simpleObj).keys();
   expect(keys).toEqual(['a', 'b', 'c', 'd']);
});

describe('obex.values()', () => {
   const values = obex(simpleObj).values();
   expect(values).toEqual([1, 2, 3, 4]);
});
