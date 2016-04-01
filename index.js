'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = obex;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function obex(obj) {
   return {
      map: function map(keyMapper, valueMapper) {
         return extend(Object.keys(obj).reduce(function (acc, cur) {
            return _extends({}, acc, _defineProperty({}, keyMapper(cur, obj[cur]), valueMapper(obj[cur], cur)));
         }, {}));
      },
      filter: function filter(fn) {
         return extend(Object.keys(obj).reduce(function (acc, cur) {
            return _extends({}, acc, fn(cur, obj[cur]) ? _defineProperty({}, cur, obj[cur]) : {});
         }, {}));
      }
   };
}

function extend(obj) {
   var result = _extends({}, obj);
   Object.defineProperty(result, 'map', {
      value: obex(result).map
   });
   Object.defineProperty(result, 'filter', {
      value: obex(result).filter
   });
   return result;
}
