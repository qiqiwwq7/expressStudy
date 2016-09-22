'use strict';
define([
  'angular'
], function (angular) {
  angular.module('index',[])
  .controller('indexController',function ($scope) {
    $scope.name = 'zhangsan';

    angular.element('.remove').html(angular.element('#ee'));
  })

  return {
    init: function () {
      angular.bootstrap(document, ['index']);
    }
  }
})
