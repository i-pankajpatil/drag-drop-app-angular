'use strict';

(function() {
    angular.module('productsApp').controller('productController', function($scope) {

        $scope.offerProductList = [];
        $scope.productNameList = [];
        $scope.droppedProdNameList = [];
        $scope.totalComboPrice = 0;
        $scope.sortParam = 'price';

        //function to reload prod new list
        $scope.loadProductList = function() {
            $scope.prodList = localStorage.getItem('productList');
            if ($scope.prodList)
                $scope.prodList = JSON.parse($scope.prodList);

            $scope.offerProductList = localStorage.getItem('offerList');
            if ($scope.offerProductList)
                $scope.offerProductList = JSON.parse($scope.offerProductList);

            angular.forEach($scope.offerProductList, function(offerProd) {
                $scope.totalComboPrice += offerProd.price;
            });
        }

        //function to add new product
        $scope.addNewProduct = function() {
            $scope.prodList = localStorage.getItem('productList');
            if (!$scope.prodList)
                $scope.prodList = [];
            else
                $scope.prodList = JSON.parse($scope.prodList);

            //object to store product detail
            var prodObj = {};
            prodObj['name'] = $scope.productName;
            prodObj['price'] = $scope.productPrice;
            prodObj['desc'] = $scope.productDesc;
            $scope.prodList.push(prodObj);

            //adding new product to the list
            localStorage.setItem('productList', JSON.stringify($scope.prodList));
            $scope.loadProductList();
            angular.element('#productModal').modal('hide');

            $scope.productName = '';
            $scope.productPrice = '';
            $scope.productDesc = '';
        };

        //function call to load product list
        $scope.loadProductList();


        $scope.onDragComplete = function(data, evt) {
            console.log("drag success, data:", data);
        }

        //function to perform drop product action
        $scope.onDropComplete = function(data, evt) {
            $scope.offerProductList = localStorage.getItem('offerList');
            $scope.droppedProdNameList = localStorage.getItem('droppedItemList');
            if (!$scope.offerProductList)
                $scope.offerProductList = [];
            else
                $scope.offerProductList = JSON.parse($scope.offerProductList);

            if (!$scope.droppedProdNameList)
                $scope.droppedProdNameList = []
            else
                $scope.droppedProdNameList = JSON.parse($scope.droppedProdNameList);

            if ($scope.droppedProdNameList.indexOf(data.name) < 0) {
                $scope.offerProductList.push(data);
                $scope.droppedProdNameList.push(data.name);
            }
            localStorage.setItem('offerList', JSON.stringify($scope.offerProductList));
            localStorage.setItem('droppedItemList', JSON.stringify($scope.droppedProdNameList));
            $scope.loadProductList();
        }

        //function to sort product list
        $scope.sortProducts = function() {
            if ($scope.sortParam == 'price') {
                $scope.sortParam = '-price';
            } else {
                $scope.sortParam = 'price';
            }
        }
    });
}());