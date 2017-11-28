(function(){
    'use strict';

    angular
        .module('card')
        .service('MenuService', MenuService)

    MenuService.$inject = ['Service'];

    function MenuService(Service) {
        this.getService = getService;

        function getService() { 
            var service = new Service('menu');
            return service;
        }
    }
})();