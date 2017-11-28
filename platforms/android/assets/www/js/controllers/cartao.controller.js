(function () {
    'use strict';

    angular
        .module('card')
        .controller('CartaoController', CartaoController)

    CartaoController.$inject = ['CartaoService', 'DespesaService', 'AlertService', '$state', '$stateParams'];

    function CartaoController(CartaoService, DespesaService, AlertService, $state, $stateParams) {

        var vm = this;
        vm.service = CartaoService.getService();
        vm.despesaService = DespesaService.getService();

        vm.novaDespesa = novaDespesa;
        vm.editar = editar;
        vm.excluir = excluir;

        function novaDespesa() {
            $state.go('app.despesa', { idCartao: vm.idCartao });
        }

        function editar(idDespesa) {
            alert('editar');
        }

        function excluir(idDespesa) {
            confirmExcluir().then(function (result) {
                if (result) {
                    vm.despesaService.excluir(idDespesa);
                    activate();
                }
            });
        }

        function confirmExcluir() {
            return AlertService.getConfirm('Atenção', 'Deseja realmente excluir esta despesa?');
        }

        activate();

        function activate() {
            vm.idCartao = $stateParams.idCartao;
            if (vm.idCartao !== undefined) {
                vm.despesas = DespesaService.listFilter(parseInt(vm.idCartao));
                for (var i = 0; i < vm.despesas.length; i++) {
                    vm.despesas[i].valor = parseFloat(vm.despesas[i].valor);
                }
            }
        }
    }
})();