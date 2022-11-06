angular.module('app', [ngStorage]).controller('indexController', function ($scope, $http, $localStorage) {
    $scope.tryToAuth=function(){
    $http.post('http://localhost:8189/winter/auth', $scope.user)
    .then(function successCallback(response) {
        if(response.data.token){
        $http.default.headers.common.Authorization= 'Bearer ' + response.data.token;
        $localStorage.winterMarketUser={username: $scope.user.username, token: response.data.token };

        $scope.user.username=null;
        $scope.user.password=null;

        }
       }, function.errorCallback(response){

    });


    };

    $scope.tryToLogout=function(){
    $scope.clearUser;
    $scope.user=null;

    };


    $scope.clearUser=function(){
    delete.$localStorage.winterMarketUser;
    $http.default.headers.common.Authorization='';

    };

    $scope.isUserLoggedIn=function(){
    if($localStorage.winterMarketUser){
    return true;
    } else {
    return false;
    }

    };



      $scope.authCheck=function(){
         $http.get('http://localhost:8189/winter/auth_check').then(function (response) {
                 alert(response.data.value);
              });

        };




    if($localStorage.winterMarketUser){
        try{
            let jwt=$localStorage.winterMarketUser.token;
            let payload = JSON.parse(atob(jwt.split('.')[1]));
            let currentTime = parseInt(new Data().getTime / 1000);
            if(currentTime > payload.exp){
            console.log('Token is expired');
            delete.$localStorage.winterMarketUser;
            $http.default.headers.common.Authorization='';
            }

            } catch (e) {
        }

           $http.default.headers.common.Authorization= 'Bearer ' + response.data.token;
    }




    $scope.loadProducts = function () {
        $http.get('http://localhost:8189/winter/api/v1/products').then(function (response) {
            $scope.productsList = response.data;
        });
    }

    $scope.showProductInfo = function (productId) {
        $http.get('http://localhost:8189/winter/api/v1/products/' + productId).then(function (response) {
            alert(response.data.title);
        });
    }

    $scope.removeFromCart = function (productId) {
        $http.get('http://localhost:8189/winter/api/v1/cart/remove' + productId).then(function (response) {
            $scope.loadCart();
        });
    }



      $scope.clearCart = function () {
            $http.get('http://localhost:8189/winter/api/v1/cart/clear').then(function (response) {
                $scope.loadCart();
            });
        }


    $scope.addToCart = function(productsId){
     $http.get('http://localhost:8189/winter/api/v1/cart/add/' + productId).then(function (response) {
               $scope.loadCart();
            });


    }

    $scope.loadCart = function(){
       $http.get('http://localhost:8189/winter/api/v1/cart').then(function (response) {
                $scope.cart = response.data;
            });


    }

    $scope.loadProducts();
    $scope.loadCart();

    // const contextPath = 'http://localhost:8189/market';
    //
    // $scope.fillTable = function () {
    //     $http.get(contextPath + '/api/v1/products')
    //         .then(function (response) {
    //             $scope.ProductsList = response.data;
    //         });
    // };
    //
    // $scope.submitCreateNewProduct = function () {
    //     $http.post(contextPath + '/api/v1/products', $scope.newProduct)
    //         .then(function (response) {
    //             // $scope.BooksList.push(response.data);
    //             $scope.fillTable();
    //         });
    // };
    //
    // $scope.applyFilter = function () {
    //     $http({
    //         url: contextPath + '/api/v1/books',
    //         method: "GET",
    //         params: {book_title: $scope.bookFilter.title}
    //     }).then(function (response) {
    //         $scope.BooksList = response.data;
    //     });
    // }

    // $scope.deleteProductById = function(productId) {
    //     console.log('deleteTest');
    //     $http({
    //         url: contextPath + '/api/v1/products/' + productId,
    //         method: "DELETE"
    //     }).then(function (response) {
    //         $scope.fillTable();
    //     });
    // }
    //
    // $scope.fillTable();
});