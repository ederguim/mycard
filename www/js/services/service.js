(function () {
    'use strict';

    angular
        .module('card')
        .service('Service', Service)

    Service.$inject = ['ServiceLocal', 'NextVal', '$log'];

    function Service(ServiceLocal, NextVal, $log) {

        return function (key) {

            var self = this;
            self.entidade = {};
            self.provider = [];

            self.inserirList = inserirList;
            self.excluir = excluir;
            self.editar = editar;
            self.atualizar = atualizar;
            self.listar = listar;
            self.listarFiltro = listarFiltro;
            self.limpar = limpar;

            function inserirList() {
                self.provider = listar();
                self.entidade.id = NextVal.next();
                $log.info(self.entidade);
                self.provider.push(self.entidade);
                ServiceLocal.set(key, self.provider);
                $log.info('Inserido com sucesso..');
            }

            function excluir(id) {
                $log.info(id);
                self.provider = listar();
                for (var i = 0; i < self.provider.length; i++) {
                    if (id === self.provider[i].id) {
                        $log.info(self.provider.length);
                        self.provider.splice( self.provider.indexOf(self.provider[i]), 1 );
                        $log.info(self.provider.length);
                        ServiceLocal.set(key, self.provider);
                        break;
                    }
                }
            }

            function editar(id) {
                $log.info(id);
                self.provider = listar();
                for (var i = 0; i < self.provider.length; i++) {
                    if (id === self.provider[i].id) {
                        self.entidade = self.provider[i];
                        $log.info(self.entidade);
                        break;
                    }
                }

                return self.entidade;
            }

            function atualizar() {
                self.provider = listar();
                for (var i = 0; i < self.provider.length; i++) {
                    if (self.entidade.id === self.provider[i].id) {
                        self.provider[i] = self.entidade;
                        $log.info(self.provider[i]);
                        ServiceLocal.set(key, self.provider);
                        $log.info('Atualizado com sucesso..');
                        break;
                    }
                }
            }

            function listar() {
                return ServiceLocal.get(key) || [];
            }

            function listarFiltro(id) {
                var lista = ServiceLocal.get(key);
                var listReturn = [];
                if (lista !== null) {
                    for (var i = 0; i < lista.length; i++) {
                        if (id === lista[i].id) {
                            listReturn.push(lista[i]);
                        }
                    }
                    return listReturn;
                }
                return listReturn;
            }

            function limpar() {
                self.entidade = {};
            }
        }
    }
})();