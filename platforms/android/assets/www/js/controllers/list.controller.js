(function () {
    'use strict';

    angular
        .module('card')
        .controller('ListController', ListController)

    ListController.$inject = ['ListService', 'CadastroService', 'DespesaService', '$state', '$stateParams', '$cordovaCalendar'];

    function ListController(ListService, CadastroService, DespesaService, $state, $stateParams, $cordovaCalendar) {

        var vm = this;
        vm.service = ListService.getService();
        vm.cadastroService = CadastroService.getService();
        vm.despesaService = DespesaService.getService();

        vm.novoCartao = novoCartao;
        vm.abrirCartao = abrirCartao;
        vm.abrirCalendario = abrirCalendario;

        function novoCartao() {
            $state.go('app.cadastro');
        }

        function abrirCartao(id) {
            $state.go('app.cartao', { idCartao: id });
        }

        activate();

        function activate() {
            vm.cartoes = vm.cadastroService.listar();
            for (var cartao = 0; cartao < vm.cartoes.length; cartao++) {
                var despesas = DespesaService.listFilter(vm.cartoes[cartao].id);
                if (despesas.length > 0) {
                    for (var despesa = 0; despesa < despesas.length; despesa++) {
                        var valor = parseFloat(despesas[despesa].valor);
                        vm.cartoes[cartao].despesa = vm.cartoes[cartao].despesa + valor;
                        vm.cartoes[cartao].limite = parseFloat(vm.cartoes[cartao].limite);
                        vm.cartoes[cartao].saldo = vm.cartoes[cartao].limite - vm.cartoes[cartao].despesa;
                    }
                } else {
                    vm.cartoes[cartao].limite = parseFloat(vm.cartoes[cartao].limite);
                    vm.cartoes[cartao].saldo = parseFloat(vm.cartoes[cartao].limite);
                }
            }
            $cordovaCalendar.createCalendar({
                calendarName: 'Cordova Calendar',
                calendarColor: '#FF0000'
            }).then(function (result) {
                // success
            }, function (err) {
                // error
            });
        }

        function abrirCalendario() {
            $cordovaCalendar.createEvent({
                title: 'Space Race',
                location: 'The Moon',
                notes: 'Bring sandwiches',
                startDate: new Date(2015, 0, 15, 18, 30, 0, 0, 0),
                endDate: new Date(2015, 1, 17, 12, 0, 0, 0, 0)
            }).then(function (result) {
                console.log("Event created successfully");
            }, function (err) {
                console.error("There was an error: " + err);
            });
        }
    }
})();