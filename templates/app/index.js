'use strict';
var angular = require('angular');

if (ON_TEST) { require('angular-mocks'); configSettings = {}; configSettings.baseName = ''; } //ON_TEST IS A Node process varible that is set on build. 
  
if (IS_LOCAL) { configSettings = {}; configSettings.baseName = ''; } //IS_LOCAL IS A Node process varible that is set on build.

// define a generic angular module
// pass the generic module reference to all required components and controllers.
var ngModule = angular.module('app', [require('angular-formly'), require('angular-formly-templates-bootstrap'), require('angular-ui-router')])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  
  $locationProvider.html5Mode(true);

  // For any unmatched url, redirect to the base state
  $urlRouterProvider.otherwise(configSettings.baseName);
  
  // Now set up the states
  $stateProvider
    // route for salesforce
    .state('base', {
      url: "/apex/" + configSettings.baseName,
      template: require('./states/main/main.html'),
      controller: require('./states/main/main.js')(ngModule)
    })
    // route for running in a local enviroment
    .state('localbase', {
      url: "/app/" + configSettings.baseName,
      template: require('./states/main/main.html'),
      controller: require('./states/main/main.js')(ngModule)
    });
});

// call all required components and controllers.
require('./components/form')(ngModule);
require('./components/simpleTest')(ngModule);
require('./components/navBar')(ngModule);
require('./states/main')(ngModule);


