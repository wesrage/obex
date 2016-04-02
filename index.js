"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = obex;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function obex(obj) {
   var entryTransformer = function entryTransformer(entryFunction) {
      return extend(Object.keys(obj).reduce(function (acc, cur) {
         return _extends({}, acc, entryFunction(cur));
      }, {}));
   };
   return {
      map: function map(keyMapper, valueMapper) {
         return entryTransformer(function (key) {
            return _defineProperty({}, keyMapper(key, obj[key]), valueMapper(obj[key], key));
         });
      },
      mapKeys: function mapKeys(keyMapper) {
         return entryTransformer(function (key) {
            return _defineProperty({}, keyMapper(key, obj[key]), obj[key]);
         });
      },
      mapValues: function mapValues(valueMapper) {
         return entryTransformer(function (key) {
            return _defineProperty({}, key, valueMapper(obj[key], key));
         });
      },
      filter: function filter(testFunction) {
         return entryTransformer(function (key) {
            return _extends({}, testFunction(key, obj[key]) ? _defineProperty({}, key, obj[key]) : {});
         });
      },
      raw: function raw() {
         return removeProperties(obj);
      }
   };
}

var addedPropertyNames = Object.keys(obex({}));

function extend(obj) {
   var result = _extends({}, obj);
   addedPropertyNames.forEach(function (propName) {
      Object.defineProperty(result, propName, {
         configurable: true,
         value: obex(result)[propName]
      });
   });
   return result;
}

function removeProperties(obj) {
   var result = _extends({}, obj);
   addedPropertyNames.forEach(function (propName) {
      return delete result[propName];
   });
   return result;
}
