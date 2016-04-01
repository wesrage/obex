import { should } from 'chai';
import obex from '../obex';
should();

describe('obex.map()', () => {
   it('returns the same object when called with identity functions', () => {
      const identity = arg => arg;
      const obj = {
         a: 1,
         b: 2,
         c: 3,
      };
      const result = obex(obj).map(identity, identity);
      result.should.deep.equal(obj);
   });

   it('maps keys and values', () => {
      const obj = {
         a: 1,
         b: 2,
         c: 3,
      };
      const result = obex(obj).map(
         key => key + key,
         value => value + 1
      );
      result.should.deep.equal({
         aa: 2,
         bb: 3,
         cc: 4,
      });
   });
});

describe('obex.filter()', () => {
   it('returns the same object when called with universally permissive filter function', () => {
      const permitter = () => true;
      const obj = {
         a: 1,
         b: 2,
         c: 3,
      };
      const result = obex(obj).filter(permitter);
      result.should.deep.equal(obj);
   });

   it('filters objects properly', () => {
      const obj = {
         a: 1,
         b: 2,
         c: 3,
      };
      const result = obex(obj).filter((key, value) => value % 2 === 0);
      result.should.deep.equal({
         b: 2,
      });
   });
});

describe('obex chaining', () => {
   it('chains directly', () => {
      const obj = {
         a: 1,
         b: 2,
         c: 3,
         d: 4,
      };
      const result = obex(obj)
         .map(key => key + key, value => value + 1)
         .filter((key, value) => value % 2 === 0)
         .map(key => key, value => value);
      result.should.deep.equal({
         aa: 2,
         cc: 4,
      });
   });

   it('should not add enumerable properties during chaining', () => {
      const obj = {};
      const extendedObj = obex(obj)
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
      const obj = {};
      const extendedObj = obex(obj)
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
