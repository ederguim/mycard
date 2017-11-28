(function(){
    'use strict';

    angular
        .module('card')
        .service('CartaoService', CartaoService)

    CartaoService.$inject = ['Service'];

    function CartaoService(Service) {
        this.getService = getService;

        function getService() { 
            var service = new Service('cartao');
            return service;
        }
    }
})();