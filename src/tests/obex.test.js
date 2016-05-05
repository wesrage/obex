import { should } from 'chai';
import obex from '../obex';
should();

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
      result.should.deep.equal(simpleObj);
   });

   it('maps keys and values', () => {
      const result = obex(simpleObj).map(
         key => key + key,
         value => value + 1
      );
      result.should.deep.equal({
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
      result.should.deep.equal({
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
      result.should.deep.equal(simpleObj);
   });

   it('maps keys', () => {
      const result = obex(simpleObj).mapKeys(
         key => key + key
      );
      result.should.deep.equal({
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
      result.should.deep.equal({
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
      result.should.deep.equal(simpleObj);
   });

   it('maps values', () => {
      const square = x => x * x;
      const result = obex(simpleObj).mapValues(square);
      result.should.deep.equal({
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
      result.should.deep.equal({
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
      result.should.deep.equal(simpleObj);
   });

   it('filters objects properly', () => {
      const result = obex(simpleObj).filter((key, value) => value % 2 === 0);
      result.should.deep.equal({
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
      result.should.deep.equal({
         aa: 2,
         cc: 4,
      });
   });

   it('should not add enumerable properties during chaining', () => {
      const extendedObj = obex({})
         .filter(() => true)
         .map(key => key, value => value);
      extendedObj.should.deep.equal({});
      for (const prop in extendedObj) {
         prop.should.not.equal('filter');
         prop.should.not.equal('map');
         prop.should.not.equal('raw');
      }
   });
});

describe('obex.raw()', () => {
   it('should remove added properties from extended objects', () => {
      const extendedObj = obex({})
         .filter(() => true)
         .map(key => key, value => value);
      const rawObj = extendedObj.raw();

      extendedObj.should.have.property('filter');
      extendedObj.should.have.property('map');
      extendedObj.should.have.property('raw');
      rawObj.should.not.have.property('filter');
      rawObj.should.not.have.property('map');
      rawObj.should.not.have.property('raw');
   });
});

describe('obex.toArray()', () => {
   it('should map an object to an array using given mapping function', () => {
      const combinedArray = obex(simpleObj)
         .toArray((key, value) => key + value);
      combinedArray.should.deep.equal(['a1', 'b2', 'c3', 'd4']);
   });
});

describe('obex.keys()', () => {
   const keys = obex(simpleObj).keys();
   keys.should.deep.equal(['a', 'b', 'c', 'd']);
});

describe('obex.values()', () => {
   const values = obex(simpleObj).values();
   values.should.deep.equal([1, 2, 3, 4]);
});
