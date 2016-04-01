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
      obex(obj)
         .filter(() => true)
         .map(key => key, value => value);
      obj.should.deep.equal({});
   });
});
