'use strict';

require.config({
  baseUrl:'/',
  paths:{
    'jquery':'common/jquery/dist/jquery.min',
    'angular':'common/angular/angular.min'
  },
  shim:{
    'jquery': {
      'exports':'jQuery'
    },
    'angular': {
      'exports': 'angular',
      'deps': ['jquery']
    }
  }
})
