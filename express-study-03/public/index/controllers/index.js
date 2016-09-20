'use strict';
define([
  'angular'
], function (angular) {
  angular.module('index',[])
  .controller('indexController',function ($scope) {
    $scope.name = 'zhangsan';
  })

  return {
    init: function () {
      angular.bootstrap(document, ['index']);
    }
  }
})
