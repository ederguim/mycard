(function () {
    'use strict';

    angular
        .module('card')
        .controller('CadastroController', CadastroController)

    CadastroController.$inject = ['CadastroService', 'AlertService', '$state'];

    function CadastroController(CadastroService, AlertService, $state) {

        var vm = this;
        vm.service = CadastroService.getService();

        vm.cadastrar = cadastrar;

        function cadastrar() {
            if (validaCampos()) {
                alertValidarCampos();
                return false;
            }
            setEntidade();
            vm.service.inserirList();
            $state.go('app.list');
        }

        function validaCampos() {
            if (vm.service.entidade.idBandeira === undefined ||
                vm.service.entidade.dataAbertura === undefined ||
                vm.service.entidade.dataFechamento === undefined ||
                vm.service.entidade.dataVencimento === undefined ||
                vm.service.entidade.limite === undefined) {
                return true;
            }
        }

        function alertValidarCampos() {
            return AlertService.getAlert('Atenção', 'Campos obrigatórios ' + '(<i class="icon ion-asterisk assertive"></i>)');
        }

        function setEntidade() {
            vm.service.entidade.saldo = 0;
            vm.service.entidade.despesa = 0;
            vm.service.entidade.dataCadastro = new Date();
            for (var i = 0; i < vm.bandeiras.length; i++) {
                if (vm.service.entidade.idBandeira === vm.bandeiras[i].id) {
                    vm.service.entidade.bandeira = vm.bandeiras[i];
                    break;
                }
            }
        }

        activate();

        function activate() {

            vm.bandeiras = [
                { 'id': '1', 'descricao': 'VISA' },
                { 'id': '2', 'descricao': 'MASTERCARD' },
                { 'id': '3', 'descricao': 'ELO' },
                { 'id': '4', 'descricao': 'AMERICAN EXPRESS' },
                { 'id': '5', 'descricao': 'HIPERCARD' }
            ]
        }
    }
})();