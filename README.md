# obex

Transform JavaScript objects.

* Map and filter objects as easily as arrays
* Methods can be chained by default
* 419 bytes gzipped

## Installation
`npm install --save obex`  
or  
`yarn add obex`

## Usage
```javascript
var obex = require('obex');

var regularObject = { propertyName: 'value' };
var transformableObject = obex(regularObject);
```

An `obex` object is just like a regular JavaScript object, but it can be transformed using methods like `filter` and `map` to make object manipulation simpler. These methods can be chained together because `obex` adds non-enumerable properties to the given raw JavaScript object.

## API

### obex
obex(_object_)
* _object_: plain old JavaScript object to become transformable using `obex` methods.
* Return: `obex` object

### .filter
filter(_testFunction_)
* _testFunction_: function to test each key-value entry in the object.
 * Parameters: (_key_, _value_)
 * Return: `true` to keep the entry, `false` otherwise.

```js
obex({ a: 3, b: 6 })
   .filter(function(key, value) {
      return value < 5;
   });
// { a : 3 }
```

### .map
map(_keyMapper_, _valueMapper_)
* _keyMapper_: function to map old keys to new keys.
 * Parameters: (_key_ [, _value_])
 * Return: replacement key for this entry.
* _valueMapper_: function to map old values to new values.
 * Parameters: (_value_ [, _key_])
 * Return: replacement value for this entry.

```js
obex({ a: 3, b: 6 }).map(
   function(key) {
      return key + key;
   },
   function(value) {
      return value * 2;
   }
);
// { aa: 6, bb: 12 }
```

### .mapKeys
mapKeys(_keyMapper_)
* _keyMapper_: function to map old keys to new keys.
 * Parameters: (_key_ [, _value_])
 * Return: replacement key for this entry.

```js
obex({ a: 3, b: 6 }).mapKeys(function(key, value) {
   return key + key + value;
});
// { aa3: 3, bb6: 6 }
```

### .mapValues
mapValues(_valueMapper_)
* _valueMapper_: function to map old values to new values.
 * Parameters: (_value_, [, _key_])
 * Return: replacement value for this entry.

```js
function square(x) { return x * x };
obex({ a: 3, b: 6 }).mapValues(square);
// { a: 9, b: 36 }
```

### .toArray
toArray(_entryMapper_)
* _entryMapper_: function to map key-value pairs to array elements,
 * Parameters: (_key_, _value_)
 * Return: array of elements mapped from key-value pairs

```js
obex({ a: 1, b: 2 }).toArray(function(key, value) {
   return key + value;
});
// ['a1', 'b2']
```

### .keys
keys()  
Returns an array containing only the object's keys

```js
obex({ a: 1, b: 2 }).keys();
// ['a', 'b']
```

### .values
values()  
Returns an array containing only the object's values

```js
obex({ a: 1, b: 2 }).values();
// [1, 2]
```

### .raw
raw()  
Converts back to a plain old JavaScript object.

```js
var a = obex({}).filter().map();
var b = a.raw();
var c = b.filter(); // Error
```
