(function(){
    'use strict';

    angular
        .module('card')
        .service('ListService', ListService)

    ListService.$inject = ['Service'];

    function ListService(Service) {
        this.getService = getService;

        function getService() { 
            var service = new Service('list');
            return service;
        }
    }
})();