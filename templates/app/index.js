'use strict';
var angular = require('angular');
if (ON_TEST) { require('angular-mocks'); } //ON_TEST IS A Node process varible that is set on build.

// define a generic angular module
// pass the generic module reference to all required components and controllers.
var ngModule = angular.module('app', [require('angular-formly'), require('angular-formly-templates-bootstrap')]);

// call all required compnents and controllers.
require('./components/form')(ngModule);
require('./components/simpleTest')(ngModule);
require('./components/navBar')(ngModule);
require('./controllers')(ngModule);

