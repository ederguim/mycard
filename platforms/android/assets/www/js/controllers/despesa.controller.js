(function () {
    'use strict';

    angular
        .module('card')
        .controller('DespesaController', DespesaController)

    DespesaController.$inject = ['DespesaService', 'CadastroService', 'AlertService', '$state', '$stateParams', '$filter', '$ionicPopup'];

    function DespesaController(DespesaService, CadastroService, AlertService, $state, $stateParams, $filter, $ionicPopup) {
        var vm = this;
        vm.service = DespesaService.getService();
        vm.cadastroService = CadastroService.getService();
        vm.cadastrar = cadastrar;
        vm.atualizar = atualizar;

        function atualizar() {
            DespesaService.atualizar();
            $state.go('app.list');
        }

        function cadastrar() {
            if (validaCampos()) {
                alertValidarCampos();
                return false;
            }
            vm.service.entidade.idCartao = parseInt(vm.idCartao);
            vm.service.inserirList();
            alertSaldoDisponivel().then(function (res) {
                $state.go('app.cartao', { idCartao: vm.idCartao });
            });
        }

        function validaCampos() {
            if (vm.service.entidade.dataCompra === undefined ||
                vm.service.entidade.descricao === undefined ||
                vm.service.entidade.valor === undefined) {
                return true;
            }
        }

        function alertSaldoDisponivel() {
            return AlertService.getAlert('Atenção', 'Limite disponivel, ' + $filter('currency')(calculaSaldoDisponivel()));
        }

        function alertValidarCampos() {
            return AlertService.getAlert('Atenção', 'Campos obrigatórios ' + '(<i class="icon ion-asterisk assertive"></i>)');
        }


        function calculaSaldoDisponivel() {
            var saldoDisponivel = 0;
            vm.cartoes = vm.cadastroService.listarFiltro(parseInt(vm.idCartao));
            for (var cartao = 0; cartao < vm.cartoes.length; cartao++) {
                var despesas = DespesaService.listFilter(parseInt(vm.cartoes[cartao].id))
                if (despesas.length > 0) {
                    for (var despesa = 0; despesa < despesas.length; despesa++) {
                        var valor = parseFloat(despesas[despesa].valor);
                        vm.cartoes[cartao].despesa = vm.cartoes[cartao].despesa + valor;
                        saldoDisponivel = parseFloat(vm.cartoes[cartao].limite) - vm.cartoes[cartao].despesa;
                    }
                }
            }
            return saldoDisponivel;
        }

        activate();

        function activate() {
            vm.idCartao = $stateParams.idCartao;

            if (vm.idCartao !== '') {
                vm.service.editar(parseInt(vm.idCartao));
                vm.service.entidade.dataCompra = $filter('date')(vm.service.entidade.dataCompra, 'dd/MM/yyyy');
            }
        }
    }
})();