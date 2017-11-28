(function(){
    'use strict';

    angular
        .module('card')
        .service('DespesaService', DespesaService)

    DespesaService.$inject = ['Service', 'ServiceLocal'];

    function DespesaService(Service, ServiceLocal) {
        this.getService = getService;
        this.listFilter = listFilter;

        function getService() { 
            var service = new Service('despesa');
            return service;
        }

        function listFilter(id) {
            var lista = ServiceLocal.get('despesa');
            var listReturn = [];
            if (lista !== null) {
                for (var i = 0; i < lista.length; i++) {
                    if (id === lista[i].idCartao) {
                        listReturn.push(lista[i]);
                    }
                }
                return listReturn;
            }
            return listReturn;
        }
    }
})();
