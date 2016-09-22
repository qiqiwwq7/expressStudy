'use strict';

require.config({
  baseUrl:'/',
  paths:{
    'jquery':'common/jquery/dist/jquery.min',
    'angular':'common/angular/angular'
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
