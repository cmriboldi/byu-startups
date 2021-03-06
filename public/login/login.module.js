/**
 * 1. We have added a directive with the name 'nav' and handler of
 * avatarDirective to our angular app module
 */
angular.module('loginApp', [])
  .directive('login', loginDirective)
  .controller('loginCtrl', ['$scope', '$http', '$httpParamSerializer', function ($scope, $http, $httpParamSerializer) {
    
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    
    $scope.state = "Log in";
    $scope.username = "";
    $scope.password = "";
    $scope.message = "";
    
    $scope.login = function() {
      console.log("The user is trying to login.");
      console.log("$scope.username is: ", $scope.username);
      console.log("$scope.password is: ", $scope.password);
      
      $http.post('/login', $httpParamSerializer({
          username: $scope.username,
          password: $scope.password
        })).success(function(data){
          console.log("successfully logged In");
          console.log("data is: ", data);
        }).error(function(err){
          console.log("error is: ", err);
        });
    }
    
    // $scope.users = [];
    //
    // $scope.addNew = function (user) {
    //   $scope.users.push({
    //     name: user.name,
    //     avatarUrl: user.url
    //   }); /* [1] */
    //
    //   user.name = ''; /* [2] */
    //   user.url = ''; /* [2] */
    // };
  }]);
  
/**
 * 1. this defines the api of our avatar directive. This means we are
 * expecting a user property whose value should be interpreted as an object.
 * 2. This simply means we want this directive to be used as an element.
 * 3. You can see here we've moved the html that was in our template before
 * and give it as the template for this directive. This means wherever we use
 * <avatar /> this html will also be placed there.
 * 4. Here we are implementing the feature where if there is no user avatar url,
 * we go ahead and give it a default
 */
function loginDirective () {
  console.log("init Directive");
  
  return {
    scope: {
      message: "=message" /* [1] */
    },
    
    restrict: 'E', /* [2] */
    templateUrl: './login.html'
  };
}