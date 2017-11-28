(function(){
    'use strict';

    angular
        .module('card')
        .service('CadastroService', CadastroService)

    CadastroService.$inject = ['Service'];

    function CadastroService(Service) {
        this.getService = getService;

        function getService() { 
            var service = new Service('cadastro');
            return service;
        }
    }
})();