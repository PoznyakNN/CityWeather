angular.module('starter.controllers', [])

.controller('CityCtrl', function($scope, Cities) {
  $scope.cities = Cities.all();
})

.controller('CityDetailCtrl', function($scope, $http, $stateParams, $ionicPopup) {
  $scope.data = {};
  $scope.id = $stateParams.id;
  $scope.showAlert = function(title, text) {
    $ionicPopup.alert({
      title: title,
      template: text
    });
  };

  $scope.refresh = function() {
    $http.get('http://api.openweathermap.org/data/2.5/forecast/city?id='+$scope.id+'&APPID=e7d366f999b0fb46913d23452fe40f6f')
    .success(function(data, status, headers, config) {
      $scope.data = data;
      $scope.$broadcast('scroll.refreshComplete');
    })
    .error(function(data, status, headers, config) {
      $scope.showAlert(status, data);
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.refresh();
})
