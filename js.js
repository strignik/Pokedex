var app = angular.module('application', ['ngMaterial']);

app.controller('main', function ($scope,$http,$window) {
    $scope.pockemons = [];
    $scope.chosen;
    $scope.hide=false;
    $scope.checkdata={};
    $scope.typeFilter='';
    $scope.filters=[];
    $scope.isLoading=true;
    $scope.colors={
        normal:"red"
    };
    getData();
    function getData(){
        $scope.isLoading = true;
       $http.get("http://pokeapi.co/api/v1/pokemon/?limit=12").success(function(data){
           for (var i=0; i<data.objects.length; i++) {
               $scope.pockemons.push(data.objects[i]);
               $scope.pockemons.next=data.meta.next;
           }
           console.log(data);
           console.log($scope.pockemons);
           $scope.isLoading = false;
       });
    }
    $scope.getIndex = function(id) {
        console.log("id" + id)
        $scope.pockemons.forEach(function (pockemon) {
            if(pockemon.pkdx_id==id){
                $scope.chosen=pockemon;
                console.log($scope.pockemon);
                $scope.hide=true;
            }
        })
    }
    $scope.load = function(){
        $scope.isLoading = true;
        $http.get("http://pokeapi.co/"+$scope.pockemons.next).success(function(data){
            for (var i=0; i<data.objects.length; i++) {
                $scope.pockemons.push(data.objects[i]);
                $scope.pockemons.next=data.meta.next;
            }
            console.log(data);
            console.log($scope.pockemons);
            $scope.isLoading = false;
        });
    }
    $scope.loadFilters = function (filter) {
        if($scope.typeFilter==filter){
            $scope.typeFilter='';
        }else {
            $scope.typeFilter = filter;
        }
    }
    $scope.getFilters = function () {
        $http.get('http://pokeapi.co/api/v1/type/?limit=999').then(function (response) {
            $scope.filters = response.data.objects;
            console.log($scope.filters);
        })
    }
    $scope.getFilters();
});