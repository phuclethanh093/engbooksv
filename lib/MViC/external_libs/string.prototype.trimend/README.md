String.prototype.trimEnd <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

[![browser support][testling-svg]][testling-url]

An ES2019-spec-compliant `String.prototype.trimEnd` shim. Invoke its "shim" method to shim `String.prototype.trimEnd` if it is unavailable.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [spec](http://www.ecma-international.org/ecma-262/6.0/#sec-object.assign). In an ES6 environment, it will also work properly with `Symbol`s.

Most common usage:
```js
var trimEnd = require('string.prototype.trimend');

assert(trimEnd(' \t\na \t\n') === 'a \t\n');

if (!String.prototype.trimEnd) {
	trimEnd.shim();
}

assert(trimEnd(' \t\na \t\n ') === ' \t\na \t\n '.trimEnd());
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.com/package/string.prototype.trimend
[npm-version-svg]: http://vb.teelaun.ch/es-shims/String.prototype.trimEnd.svg
[travis-svg]: https://travis-ci.org/es-shims/String.prototype.trimEnd.svg
[travis-url]: https://travis-ci.org/es-shims/String.prototype.trimEnd
[deps-svg]: https://david-dm.org/es-shims/String.prototype.trimEnd.svg
[deps-url]: https://david-dm.org/es-shims/String.prototype.trimEnd
[dev-deps-svg]: https://david-dm.org/es-shims/String.prototype.trimEnd/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/String.prototype.trimEnd#info=devDependencies
[testling-svg]: https://ci.testling.com/es-shims/String.prototype.trimEnd.png
[testling-url]: https://ci.testling.com/es-shims/String.prototype.trimEnd
[npm-badge-png]: https://nodei.co/npm/string.prototype.trimend.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/string.prototype.trimend.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/string.prototype.trimend.svg
[downloads-url]: http://npm-stat.com/charts.html?package=string.prototype.trimend
